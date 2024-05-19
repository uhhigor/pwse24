#!/bin/sh
jq '."scripts"."start"="PORT=5005 react-scripts start"' package.json > backup.json
mv backup.json package.json