#!/usr/bin/env bash
set -euo pipefail

sudo apt update -y
sudo apt install -y nodejs npm

sudo apt install -y nodejs npm

sudo ufw allow 8443

npm i

if command -v screen >/dev/null 2>&1; then
	if ! screen -list | grep -q "\bproxy\b"; then
		screen -S proxy -dm node proxy.js
		started=true
	else
		echo "screen session 'proxy' already exists"
		started=true
	fi

	if [ -t 1 ]; then
		echo "Attaching to screen session 'proxy' (Ctrl+A D to detach)..."
		if ! screen -r proxy; then
			echo "Unable to attach to screen session; proxy may be running detached."
		fi
	else
		echo "Started proxy in screen session 'proxy' (detached)"
	fi
else
	echo "screen not found, starting with nohup"
	nohup node proxy.js >/dev/null 2>&1 &
fi
