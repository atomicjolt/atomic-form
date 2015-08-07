#!/bin/bash -e

babel=node_modules/.bin/babel
webpack=node_modules/.bin/webpack
build_dir=lib

rm -rf $build_dir

$babel ./src -d $build_dir --ignore "*.spec.js"

NODE_ENV=production $webpack src/index.js $build_dir/umd/AtomicForm.js
NODE_ENV=production $webpack -p src/index.js $build_dir/umd/AtomicForm.min.js

echo "gzipped, the global build is `gzip -c $build_dir/umd/AtomicForm.min.js | wc -c | sed -e 's/^[[:space:]]*//'` bytes"
