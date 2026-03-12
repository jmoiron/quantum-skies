#!/usr/bin/env python3
"""
qbgraph.py - Build an item dependency graph from the FTB questbook.

Usage:
    python3 qbgraph.py <path-to-ftbquests-dir> [output.json]

The input path should be the directory containing the "quests" subdirectory,
e.g. pack/config/ftbquests.

For each item that appears in item tasks, outputs its direct required items
based on the quest dependency graph: if quest B depends on quest A, items in
B depend on items in A.
"""

import sys
import os
import json
from collections import defaultdict, OrderedDict

sys.path.insert(0, os.path.dirname(__file__))
from snbt import grammar


def extract_item_id(item):
    """Extract a canonical item ID string from an item task's item field.

    Returns None for tag filters (itemfilters:tag) since they don't represent
    a single concrete item.
    """
    if isinstance(item, str):
        return item
    if isinstance(item, (dict, OrderedDict)):
        item_id = item.get('id', '')
        if item_id == 'itemfilters:tag':
            tag_value = (item.get('tag') or {}).get('value')
            return f'#{tag_value}' if tag_value else None
        return item_id if item_id else None
    return None


def load_chapter(path):
    """Parse an snbt chapter file and return the parsed object."""
    with open(path) as f:
        return grammar.parse_snbt(f.read())


def load_quests(ftbquests_dir):
    """Load all quests from all chapters. Returns a dict: quest_id -> quest data."""
    chapters_dir = os.path.join(ftbquests_dir, 'quests', 'chapters')
    quests = {}
    for fname in os.listdir(chapters_dir):
        if not fname.endswith('.snbt'):
            continue
        chapter = load_chapter(os.path.join(chapters_dir, fname))
        for quest in chapter.get('quests', []):
            qid = quest.get('id')
            if qid:
                quests[qid] = quest
    return quests


def build_item_graph(quests):
    """Build item dependency graph from quest data.

    Returns dict: item_id -> sorted list of direct dependency item IDs.
    """
    # quest_id -> list of item IDs required by that quest
    quest_items = defaultdict(list)
    for qid, quest in quests.items():
        for task in quest.get('tasks', []):
            if task.get('type') != 'item':
                continue
            item_id = extract_item_id(task.get('item'))
            if item_id and item_id not in quest_items[qid]:
                quest_items[qid].append(item_id)

    # item_id -> set of quest IDs that require this item
    item_quests = defaultdict(set)
    for qid, items in quest_items.items():
        for item_id in items:
            item_quests[item_id].add(qid)

    # Build item dependency graph:
    # For each item I in quest Q, I depends on all items in Q's direct dependency quests.
    item_deps = defaultdict(set)
    for qid, quest in quests.items():
        dep_quest_ids = quest.get('dependencies', [])
        if not dep_quest_ids:
            continue
        items_in_this_quest = quest_items.get(qid, [])
        if not items_in_this_quest:
            continue
        # Collect all items from all directly depended-upon quests
        dep_items = set()
        for dep_qid in dep_quest_ids:
            for dep_item in quest_items.get(dep_qid, []):
                dep_items.add(dep_item)
        for item_id in items_in_this_quest:
            item_deps[item_id].update(dep_items)

    # Ensure all items appear in output (even those with no dependencies)
    all_items = set(item_quests.keys())
    result = {}
    for item_id in sorted(all_items):
        deps = sorted(item_deps[item_id] - {item_id})
        result[item_id] = deps

    return result


def main():
    import argparse
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('ftbquests_dir', help='Path to the ftbquests config dir (contains quests/)')
    parser.add_argument('output', nargs='?', help='Output JSON file (default: stdout)')
    parser.add_argument('--sample', metavar='N', type=int, default=0,
                        help='Print N sample items-with-dependencies to stderr and exit')
    args = parser.parse_args()

    quests = load_quests(args.ftbquests_dir)
    print(f"Loaded {len(quests)} quests", file=sys.stderr)

    graph = build_item_graph(quests)
    items_with_deps = [(k, v) for k, v in graph.items() if v]
    print(f"Graph: {len(graph)} items, {len(items_with_deps)} with dependencies", file=sys.stderr)

    if args.sample:
        for item, deps in items_with_deps[:args.sample]:
            print(f"  {item}: {deps}", file=sys.stderr)
        return

    output = json.dumps(graph, indent=2)
    if args.output:
        with open(args.output, 'w') as f:
            f.write(output)
        print(f"Written to {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == '__main__':
    main()
