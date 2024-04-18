#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""dumping utilities for obj => snbt"""

import io
from decimal import Decimal
from collections import OrderedDict

class SnbtSerializer(object):
    def __init__(self, use_tabs=False):
        self.indent = 4
        self.level = 0
        self.use_tabs = use_tabs

    def dumps(self, obj):
        with io.StringIO() as out:
            self.dump(obj, out)
            return out.getvalue()

    def dump(self, obj, fd):
        self.dump_object(obj, fd)

    def _indent(self):
        if self.use_tabs:
            return "\t" * self.level
        return (" " * self.indent) * self.level

    def _nl(self, fd, indent=0):
        fd.write("\n")
        self.level += indent

    def _write_first(self, s, fd):
        fd.write(self._indent())
        fd.write(s)

    def dump_object(self, obj, fd):
        fd.write("{")
        self._nl(fd, 1)
        for key, val in obj.items():
            self._write_first(key, fd)
            fd.write(": ")
            self.dump_value(val, fd)
            self._nl(fd)
        self.level -= 1
        self._write_first("}", fd)

    def dump_value(self, val, fd):
        if type(val) in (int, float):
            fd.write(str(val))
        elif type(val) == str:
            fd.write('"%s"' % (val))
        elif type(val) == bool:
            fd.write(str(val).lower())
        elif type(val) == Decimal:
            fd.write("%sd" % (val))
        elif type(val) == list:
            self.dump_list(val, fd)
        elif type(val) == OrderedDict:
            self.dump_object(val, fd)
        return
    
    def dump_list(self, val, fd):
        if len(val) == 0:
            fd.write("[ ]")
        elif len(val) == 1:
            fd.write("[")
            self.dump_value(val[0], fd)
            fd.write("]")
        else:
            fd.write("[")
            self.level += 1
            self._nl(fd)
            for v in val:
                fd.write(self._indent())
                self.dump_value(v, fd)
                self._nl(fd)
            self.level -= 1
            self._write_first("]", fd)



if __name__ == "__main__":
    import grammar
    f = open("test.snbt").read()
    obj = grammar.parse_snbt(f)
    print(SnbtSerializer(use_tabs=True).dumps(obj))


