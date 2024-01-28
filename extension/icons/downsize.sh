#!/bin/bash -ex

for s in 16 48 128; do
  convert icon-256.png -resize "$sx$s" "icon-$s.png"
done
