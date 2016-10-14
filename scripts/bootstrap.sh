#!/usr/bin/env sh
mkdir files
php scripts/dl.php
node scripts/find.js > quotes.json
rm -rf files
