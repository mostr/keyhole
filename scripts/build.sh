#!/bin/sh -e

rm -rf lib
`npm bin`/babel src --out-dir lib