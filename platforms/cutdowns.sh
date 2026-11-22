#!/usr/bin/env bash
# Cut-downs of the approved 9:16 reels for feeds that are not vertical:
# 16:9 (YouTube video, X, LinkedIn, Product Hunt, Facebook feed) and 1:1 (X / Facebook / LinkedIn feed).
# The film sits whole on the right; the brand panel (rendered by render.cjs, kind "frame") fills the rest.
# Reels / TikTok / Shorts / LINE VOOM / Lemon8 keep using the original 9:16 file.
set -euo pipefail
cd "$(dirname "$0")"
F=out/img/frames
O=out/video
mkdir -p "$O"
[ -f "$F/frame-en-16x9.png" ] || node render.cjs frames/
mk() { # src lang name
  local src=$1 lang=$2 name=$3 a=()
  if ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 "$src" | grep -q audio; then a=(-map 1:a -c:a aac -b:a 160k); fi
  ffmpeg -y -v error -loop 1 -framerate 30 -i "$F/frame-$lang-16x9.png" -i "$src" -filter_complex \
    "[1:v]scale=608:1080:flags=lanczos[v];[0:v][v]overlay=1192:0:shortest=1,format=yuv420p[o]" -map "[o]" "${a[@]}" \
    -c:v libx264 -preset slow -crf 21 -r 30 -movflags +faststart "$O/$name-16x9.mp4"
  ffmpeg -y -v error -loop 1 -framerate 30 -i "$F/frame-$lang-1x1.png" -i "$src" -filter_complex \
    "[1:v]scale=608:1080:flags=lanczos[v];[0:v][v]overlay=472:0:shortest=1,format=yuv420p[o]" -map "[o]" "${a[@]}" \
    -c:v libx264 -preset slow -crf 21 -r 30 -movflags +faststart "$O/$name-1x1.mp4"
  echo "$name: $(du -h "$O/$name-16x9.mp4" | cut -f1) / $(du -h "$O/$name-1x1.mp4" | cut -f1)"
}
mk ../films/payday-ui/payday-ui-sfx.mp4 en payday-en   # 15 s, code-made sound (safe to post as is)
mk ../films/click-30/click-30.mp4 en click30-en        # 30 s, silent: add a song in the app
mk ../films/everywhere/final.mp4 th everywhere-th      # 15 s, Thai hook, code-made track
