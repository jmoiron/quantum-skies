#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""snbt grammar"""

from parsimonious import Grammar
from parsimonious.nodes import NodeVisitor

from decimal import Decimal
from collections import OrderedDict


grammar = Grammar(
    r"""
    object = o1 / o2
    o1   = lbrace sskv? rbrace
    o2   = lbrace cskv? rbrace
    list = lbrack val* rbrack
    sskv = kv*
    cskv = kv (comma kv)*
    kv = symbol colon val

    symbol = ~r"[\w\._]+"
    string = '"' ~r'(?:\\.|[^\"\\])+'? '"'
    bool   = ( "false" / "true" )

    digits  = ~r"[0-9]+"
    long    = int ("L" / "b")
    int     = "-"? digits
    float   = int "." digits "f"?
    decimal = float "d"
    number  = (decimal / float / long / int)

    val = _ (object / list / string / bool / number) _

    ws = ~r"\s*"
    _ = ws?
    lbrack  = _ "[" _
    rbrack  = _ "]" _
    lbrace  = _ "{" _
    rbrace  = _ "}" _
    colon   = _ ":" _
    comma   = _ "," _
    """
)

def _f(children):
    return [c for c in children if c is not None]

def hoist(children):
    c = _f(children)
    if len(c) == 1:
        return c[0]
    return c

class SnbtVisitor(NodeVisitor):
    def visit_object(self, node, visited_children):
        obj = OrderedDict()
        for child in _f(visited_children):
            if isinstance(child, list):
                for c in child:
                    obj.update(c)
            elif isinstance(child, (dict, OrderedDict)):
                obj.update(child)
            else:
                print("unknown type", type(child))
        return obj

    def visit_list(self, node, visited_children):
        ch = _f(visited_children)
        if len(ch) == 1 and type(ch[0]) == list:
            return ch [0]
        return ch
    
    def visit_kv(self, node, visited_children):
        key, value  = _f(visited_children)
        return {key: value}

    def visit_number(self, node, visited_children):
        val = node.text
        if val.endswith("d"):
            return Decimal(val[:-1])
        if val.endswith("f"):
            return float(val[:-1])
        if val.endswith("b") or val.endswith("L"):
            val = val[:-1]
        if "." not in val:
            return int(val)
        return float(val)

    def visit_bool(self, node, visited_children):
        if node.text == "true":
            return True
        elif node.text == "false":
            return False
        raise Exception("unexpected boolean value %s" % (node.text))

    def visit_symbol(self, node, visited_children):
        return node.text

    def visit_string(self, node, visited_children):
        return node.text[1:-1]

    def visit_val(self, node, visited_children):
        return hoist(visited_children)

    def generic_visit(self, node, visited_children):
        text = node.text.strip()
        if text in {"", ":", "[", "]", "{", "}", ","}:
            return None
        return hoist(visited_children)

    
def parse_snbt(s):
    tree = grammar.parse(s)
    return SnbtVisitor().visit(tree)

if __name__ == "__main__":
    import pprint
    f = open("test2.snbt").read()
    obj = parse_snbt(f)
    pprint.pprint(obj)


