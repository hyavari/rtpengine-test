#!/bin/bash

serverIp=$(hostname -I | cut -d' ' -f1)
callerLocalPort=2000
calleeLocalPort=2010
filename=recording.wav

CALLER=$(node caller.js ../sdps/caller.json)
echo "caller: $CALLER"
CALLERPORT=$(echo $CALLER | awk '{print $NF}')

CALLEE=$(node callee.js ../sdps/callee.json)
echo "callee: $CALLEE"
CALLEEPORT=$(echo $CALLEE | awk '{print $NF}')


ffmpeg -re -i ../audio-samples/${filename} -ar 8000 -ac 1 -acodec pcm_mulaw -f rtp "rtp://${serverIp}:${CALLERPORT}?localrtpport=${callerLocalPort}" -ar 8000 -ac 1 -acodec pcm_mulaw -f rtp "rtp://${serverIp}:${CALLEEPORT}?localrtpport=${calleeLocalPort}"