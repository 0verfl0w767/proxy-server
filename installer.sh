#!/usr/bin/env bash
set -euo pipefail

sudo apt update -y
sudo apt install -y nodejs npm screen

sudo ufw allow 8443

npm i

screen -S proxy -dm node proxy.js
