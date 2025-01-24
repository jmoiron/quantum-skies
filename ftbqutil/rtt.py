#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""round trip snbt through the parser"""


from snbt import grammar, dump
from argparse import ArgumentParser

p = ArgumentParser()
p.add_argument("path", type=str)

args = p.parse_args()

with open(args.path) as f:
    s = f.read()
    obj = grammar.parse_snbt(s)
    print(dump.SnbtSerializer(use_tabs=True).dumps(obj))




