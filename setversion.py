#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Sets the questbook version from the pack version in the jankest way possible."""

# 2 reasons for super jank
#  - wanted this to be python so i have a chance of updating it later if i need to
#  - did not want to deal with pipenv/dep.txt or a toml/snbt lib

import os
import sys
import re

PACK_CFG_PATH = "pack/pack.toml"
INTRO_PATH = "pack/config/ftbquests/quests/chapters/introduction.snbt"


def get_version(path=PACK_CFG_PATH):
    with open(path) as f:
        lines = f.readlines()
        vers = [l.strip() for l in lines if l.startswith("version")]
        if len(vers) == 0:
            raise Exception("Could not determine version from %s" % (cfg_path))
        vs = vers[0]
        vn = vs.split(" = ")[1].strip().strip('"')
        return vn


def main():
    try:
        version = get_version()
    except Exception as e:
        print(e)
        os.exit(-1)
    print("setting pack to version %s" % (version))
    with open(INTRO_PATH) as f:
        vs = 'subtitle: "&aQuantum Skies&r v%s"' % (version)
        text = f.read()
        subre = re.compile(r'subtitle: "&aQuantum Skies&r v(.+)"')
        text = subre.sub(vs, text)
    with open(INTRO_PATH, "w") as f:
        f.write(text)


if __name__ == "__main__":
    main()
