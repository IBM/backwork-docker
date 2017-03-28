#!/bin/ash

# Exit immediately if a command exits with a non-zero status.
set -e

npm install
npm run lint
npm test
