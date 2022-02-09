#!/bin/sh
#
# This script copies package.json's from all the packages and rush related files
# into a cache folder, which can then be used in Dockerfile to cache dependencies.

set -e

root=$(dirname "$0")/../..
cache="${root}/cache"

rm -rf "${cache}"
mkdir -p "${cache}"

find "${root}" -path "${cache}" -prune -o -name node_modules -prune -o -name 'package.json' -exec cp --parents "{}" "${cache}" \;
# cp -a "${root}/rush.json" "${cache}"
# cp -a "${root}/common" "${cache}"
