#!/usr/bin/env python3
"""Explore quest structure to understand item task formats."""

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from snbt import grammar

chapter = sys.argv[1] if len(sys.argv) > 1 else "from_nothing"
path = os.path.join(os.path.dirname(__file__), f"../pack/config/ftbquests/quests/chapters/{chapter}.snbt")

with open(path) as f:
    data = grammar.parse_snbt(f.read())

for q in data['quests']:
    item_tasks = [t for t in q.get('tasks', []) if t.get('type') == 'item']
    if not item_tasks:
        continue
    print(f"Quest: {q.get('title', '?')} ({q.get('id')})")
    print(f"  Deps: {q.get('dependencies', [])}")
    for t in item_tasks:
        item = t.get('item')
        print(f"  item task: {type(item).__name__} => {item}")
    print()
