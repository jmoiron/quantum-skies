#!/usr/bin/env bash

if command -v dos2unix &> /dev/null; then
    find . -type f -exec dos2unix {} \;
fi
