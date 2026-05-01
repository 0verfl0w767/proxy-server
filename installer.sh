#!/usr/bin/env bash
set -euo pipefail

sudo apt update -y
sudo apt install -y nodejs npm

npm i

node proxy.js
