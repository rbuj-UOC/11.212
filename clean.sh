#!/usr/bin/env bash

# Description: Removes node_modules directories under the current folder
# (up to depth 4) to quickly clean Node.js project dependencies.

find . -maxdepth 3 -name node_modules -exec rm -fr {} \+
find . -maxdepth 4 -name node_modules -exec rm -fr {} \+