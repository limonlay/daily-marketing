#!/usr/bin/env python3
"""Beat grid + drop for a music file, for cutting a Daily film to the music.

    python3 beats.py song.mp3 [--bpm 128] [--film 15] [--out beats.json]

Prints tempo, the drop (biggest jump in bar energy) and the song offset that puts the drop at
--drop-at seconds of the film (default: 1/3 of the film). Writes beats.json = beat times in FILM
time (after the offset), ready for `render.mjs --beats` and `check.py --beats`.
Uses librosa when installed (better onsets); otherwise an ffmpeg energy envelope.
--offset S starts the song at S seconds (0 for the code-made track). --bpm forces the grid (code-made tracks such as assets/daily-track-128bpm.wav are exact).
"""
import argparse, json, subprocess, sys
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('song'); ap.add_argument('--bpm', type=float); ap.add_argument('--film', type=float, default=15)
ap.add_argument('--drop-at', type=float); ap.add_argument('--offset', type=float); ap.add_argument('--out', default='beats.json'); a = ap.parse_args()
SR = 22050
pcm = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', a.song, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True).stdout
y = np.frombuffer(pcm, np.float32)
if not len(y): sys.exit('could not decode ' + a.song)

try:
    import librosa
    tempo, bf = librosa.beat.beat_track(y=y, sr=SR)
    beats = librosa.frames_to_time(bf, sr=SR); bpm = float(np.atleast_1d(tempo)[0])
except ImportError:
    hop = 512; env = np.sqrt(np.convolve(y ** 2, np.ones(hop) / hop, 'same')[::hop])
    on = np.maximum(0, np.diff(env, prepend=env[0]))
    lags = np.arange(int(60 / 180 * SR / hop), int(60 / 70 * SR / hop))
    ac = [np.dot(on[:-l], on[l:]) for l in lags]; period = lags[int(np.argmax(ac))] * hop / SR
    bpm = 60 / period
    phase = max(range(int(period * SR / hop)), key=lambda p: on[p::max(1, int(round(period * SR / hop)))].sum())
    beats = np.arange(phase * hop / SR, len(y) / SR, period)
if a.bpm:
    bpm = a.bpm; beats = np.arange(beats[0] % (60 / bpm) if len(beats) else 0, len(y) / SR, 60 / bpm)

# drop = biggest rise in per-bar energy
bar = 4 * 60 / bpm
starts = [b for b in beats[::4]]
E = [float(np.mean(y[int(s * SR):int((s + bar) * SR)] ** 2)) for s in starts]
jump = np.diff(E) if len(E) > 1 else np.zeros(1)
drop = float(starts[int(np.argmax(jump)) + 1]) if len(E) > 1 else 0.0
drop_at = a.drop_at if a.drop_at is not None else round(a.film / 3 / (60 / bpm)) * (60 / bpm)
offset = a.offset if a.offset is not None else max(0.0, drop - drop_at)
film_beats = [round(float(b - offset), 4) for b in beats if 0 <= b - offset <= a.film + 1e-6]
json.dump(film_beats, open(a.out, 'w'))
print(f'tempo   {bpm:.2f} BPM  (beat {60 / bpm:.4f} s)')
print(f'drop    {drop:.2f} s in the song  -> film {drop - offset:.2f} s')
print(f'offset  start the song at {offset:.2f} s   (ffmpeg -ss {offset:.2f})')
print(f'beats   {len(film_beats)} in film time -> {a.out}')
