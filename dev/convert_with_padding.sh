#!/bin/sh
# dev/convert_with_padding.sh path/to/file.wav sound/file.mp3
# adding 30 ms of silence before a voice beep stops chrome/blink from mangling
# it.
exec ffmpeg -i "$1" -af 'adelay=30|30' "$2"
