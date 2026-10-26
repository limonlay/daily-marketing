#!/usr/bin/env python3
"""Real beats of a song section, for cutting a reel to the music (librosa).

    python3 beats.py song.mp3 --start 84.355 [--dur 15] [--out clip_beats.json]
    python3 beats.py song.mp3 --scan            # whole song: tempo, energy per second, best 15 s sections

Writes the beat times IN CLIP TIME (0 = --start) and prints each beat's strength 0-9, so the key moments
(hook number, the drop, the logo) can sit on the strong hits. Never guess BPM from a grid: a fixed-BPM
guess was 4/3 off on the first song (129 vs the real 95.7).
librosa: `python3 -m venv ~/.reel-venv && ~/.reel-venv/bin/pip install --timeout 30 --retries 10 --only-binary=:all: librosa`
(slow downloads through the proxy: keep the retries), then run this with ~/.reel-venv/bin/python.
"""
import argparse, json
import numpy as np
import librosa

ap = argparse.ArgumentParser()
ap.add_argument('song'); ap.add_argument('--start', type=float, default=0); ap.add_argument('--dur', type=float, default=15)
ap.add_argument('--out', default='clip_beats.json'); ap.add_argument('--scan', action='store_true'); a = ap.parse_args()
y, sr = librosa.load(a.song, sr=22050)
tempo, bf = librosa.beat.beat_track(y=y, sr=sr); B = librosa.frames_to_time(bf, sr=sr)
on = librosa.onset.onset_strength(y=y, sr=sr); tt = librosa.times_like(on, sr=sr)
print(f'tempo {float(np.atleast_1d(tempo)[0]):.1f} BPM, beat {np.diff(B).mean():.3f} s, song {len(y) / sr:.1f} s')
if a.scan:
    rms = librosa.feature.rms(y=y)[0]; rt = librosa.times_like(rms, sr=sr)
    sec = [float(rms[(rt >= s) & (rt < s + 1)].mean()) for s in range(int(len(y) / sr))]; m = max(sec)
    print('energy per second (0-9):'); print(' '.join(f'{s}:{int(9 * e / m)}' for s, e in enumerate(sec)))
    print('tip: pick a section with a dip (for the "turn") 2-6 s in and a jump (the drop) ~8-9 s in.')
else:
    sel = B[(B >= a.start) & (B <= a.start + a.dur)]
    st = [float(on[max(0, np.searchsorted(tt, x) - 2):np.searchsorted(tt, x) + 3].max()) for x in sel]; m = max(st)
    clip = [round(float(x - a.start), 4) for x in sel]
    json.dump(clip, open(a.out, 'w'))
    print(f'{len(clip)} beats -> {a.out}')
    print('beat index:time:strength  ' + '  '.join(f'{i}:{x:.2f}:{int(9 * v / m)}' for i, (x, v) in enumerate(zip(clip, st))))
