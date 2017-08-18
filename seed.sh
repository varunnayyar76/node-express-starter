#!/bin/sh

if [ ! -f "./node_modules/.bin/seed" ]; then
    npm install node-mongo-seeds
fi

./node_modules/.bin/seed
