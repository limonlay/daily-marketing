#!/usr/bin/env python3
"""Sound effects made in code (no samples, no licences): renders a cue sheet from cues.cjs to a stereo wav.

    python3 sfx.py cues.json sfx.wav            # then: ffmpeg -i film.mp4 -i sfx.wav ... loudnorm=I=-14:TP=-1.5

Kinds (each cue: {"t": s, "k": kind, "g": gain 0-1, ...}):
  tick     typed letter (soft key click, random pitch)       whoosh  air sweep for a cut/slide ("dur", "pan": -1..1 start side)
  pop      thing appears (pitch drop; "p" = pitch factor)     impact  low hit for a number or the logo landing
  ding     cha-ching for "Saved"                              chime   bright arpeggio for the end card
  count    counter running ("dur", "up": true/false)          flip    date card flips
  shutter  camera click (snap a receipt)                      paper   receipt lands
  scan     scanner sweep ("dur")
Calm "Apple-like" set (soft, tonal, spacious; pair with "reverb" in the cue sheet):
  key      very soft typed letter                            tap     soft tonal UI tap ("f" Hz)
  air      gentle low airy whoosh ("dur", "pan")              glass   pure glass bells ("notes" Hz list, "gap" s, "decay" s)
  sub      soft low swell under a key moment                  rise / fall  soft gliding tone pair ("dur") for counters
Every cue may set "wet" (0-1, send to the shared reverb); the sheet may set {"reverb": {"rt": s, "mix": 0-1}}.
"""
import json, sys, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(7)
ts = lambda d: np.arange(int(d * SR)) / SR


def bp(x, lo, hi):   # band-pass by FFT mask (soft edges)
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4) / (1 + (f / hi) ** 4)
    return np.fft.irfft(X, len(x))


def bell(f0, d, partials=((1, 1), (2.0, .45), (3.01, .22), (4.2, .1)), decay=.5):
    t = ts(d); return sum(a * np.sin(2 * np.pi * f0 * m * t) * np.exp(-t * m / decay) for m, a in partials) * np.minimum(1, t / .002)


def tick(c):
    t = ts(.03); f = 2600 * rng.uniform(.85, 1.2)
    return .8 * bp(rng.standard_normal(len(t)), 2500, 9000) * np.exp(-t / .0025) + .55 * np.sin(2 * np.pi * f * t) * np.exp(-t / .006)


def whoosh(c):
    d = c.get('dur', .4); n = int(d * SR); x = rng.standard_normal(n); y = np.zeros(n); seg = 16; L = n // seg * 2
    for i in range(seg * 2 - 1):   # band moves up through the sweep, overlap-added
        s = i * L // 2; e = min(n, s + L); q = i / (seg * 2 - 2); c0 = 300 * (12 ** q)
        if e - s < 64: break
        y[s:e] += bp(x[s:e], c0 * .6, c0 * 1.8) * np.hanning(e - s)
    t = np.arange(n) / n; return 2.4 * y * np.where(t < .7, (t / .7) ** 2, (1 - (t - .7) / .3) ** 1.5)   # swells, peaks at 70 %, falls away


def pop(c):
    t = ts(.12); p = c.get('p', 1); f = (900 * np.exp(-t / .018) + 320) * p
    return .9 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .045) + .2 * bp(rng.standard_normal(len(t)), 1000, 6000) * np.exp(-t / .003)


def impact(c):
    t = ts(.7); f = 38 + 50 * np.exp(-t / .08)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .28)
    return 1.0 * body + .5 * bp(rng.standard_normal(len(t)), 60, 900) * np.exp(-t / .03)


def ding(c):   # two bells, the second a fourth up: "cha-ching"
    a = bell(1568, 1.1); b = bell(2093, 1.3); y = np.zeros(int(1.5 * SR)); y[:len(a)] += a; o = int(.085 * SR); y[o:o + len(b)] += b
    return .45 * y + .25 * np.pad(bp(rng.standard_normal(int(.05 * SR)), 3000, 12000) * np.exp(-ts(.05) / .01), (0, len(y) - int(.05 * SR)))


def chime(c):
    y = np.zeros(int(2.2 * SR))
    for i, f in enumerate([1047, 1319, 1568, 2093]):
        b = bell(f, 1.8, decay=.8); o = int(i * .07 * SR); y[o:o + len(b)] += b * (.8 + .1 * i)
    return .32 * y


def count(c):
    d = c.get('dur', 1); up = c.get('up', True); y = np.zeros(int((d + .05) * SR)); n = int(d * 24)
    for i in range(n):
        q = i / max(1, n - 1); f = 1800 * (1.6 ** (q if up else 1 - q)); t = ts(.025)
        o = int(d * (1 - (1 - q) ** 1.6) * SR) if up else int(d * q ** .7 * SR)   # follows the ease-out of the number
        s = 1.0 * np.sin(2 * np.pi * f * t) * np.exp(-t / .005); y[o:o + len(s)] += s[:len(y) - o]
    return y


def flip(c):
    y = np.zeros(int(.12 * SR))
    for o in (0, .045):
        s = bp(rng.standard_normal(int(.03 * SR)), 900, 7000) * np.exp(-ts(.03) / .006); y[int(o * SR):int(o * SR) + len(s)] += s
    return 2.0 * y


def shutter(c):
    y = np.zeros(int(.2 * SR))
    for o, g in ((0, 1), (.075, .7)):
        t = ts(.04); s = g * (bp(rng.standard_normal(len(t)), 1500, 9000) * np.exp(-t / .005) + .6 * np.sin(2 * np.pi * 180 * t) * np.exp(-t / .01))
        y[int(o * SR):int(o * SR) + len(s)] += s
    return .9 * y


def paper(c):
    t = ts(.16); return 1.0 * bp(rng.standard_normal(len(t)), 700, 5000) * np.exp(-t / .04) * (1 + .5 * np.sin(2 * np.pi * 45 * t))


def scan(c):
    d = c.get('dur', 1); t = ts(d); f = 900 + 900 * t / d
    return .22 * np.sin(2 * np.pi * np.cumsum(f) / SR) * (.6 + .4 * np.sin(2 * np.pi * 28 * t)) * np.minimum(1, t / .03) * np.minimum(1, (d - t) / .08)


def soft_on(n, a=.004):   # click-free attack
    e = np.ones(n); k = min(n, int(a * SR)); e[:k] = .5 - .5 * np.cos(np.pi * np.arange(k) / max(1, k)); return e


def key(c):
    t = ts(.025); f = 1700 * rng.uniform(.9, 1.1)
    return (.35 * bp(rng.standard_normal(len(t)), 400, 3500) * np.exp(-t / .0018) + .25 * np.sin(2 * np.pi * f * t) * np.exp(-t / .004)) * soft_on(len(t), .0007)


def tap(c):
    f = c.get('f', 1100); t = ts(.35)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / .07) + .18 * np.sin(2 * np.pi * f * 2.005 * t) * np.exp(-t / .035)
    y += .15 * bp(rng.standard_normal(len(t)), 300, 2500) * np.exp(-t / .002)
    return .6 * y * soft_on(len(t), .0015)


def air(c):
    d = c.get('dur', .5); n = int(d * SR); x = rng.standard_normal(n); y = np.zeros(n); seg = 12; L = n // seg * 2
    for i in range(seg * 2 - 1):
        s = i * L // 2; e = min(n, s + L); q = i / (seg * 2 - 2); c0 = 250 * (6 ** q)
        if e - s < 64: break
        y[s:e] += bp(x[s:e], c0 * .5, c0 * 1.6) * np.hanning(e - s)
    t = np.arange(n) / n; return 1.6 * y * np.sin(np.pi * t ** .8) ** 2


def glass(c):
    notes = c.get('notes', [1047]); gap = c.get('gap', .07); dec = c.get('decay', 1.4); d = dec * 2.5 + gap * len(notes)
    y = np.zeros(int(d * SR))
    for i, f in enumerate(notes):
        t = ts(d - i * gap); v = (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 1.004 * t)          # gentle shimmer
                                  + .12 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / (dec * .3))) * np.exp(-t / dec)
        o = int(i * gap * SR); y[o:o + len(v)] += v * soft_on(len(v), .006) * (1 - .08 * i)
    return .35 * y


def sub(c):
    t = ts(1.2); env = np.minimum(1, t / .07) ** 2 * np.exp(-t / .35)
    return 1.1 * (np.sin(2 * np.pi * 52 * t) + .25 * np.sin(2 * np.pi * 104 * t)) * env


def rise(c, up=True):
    d = c.get('dur', 1); t = ts(d); q = t / d if up else 1 - t / d; f = 660 * 2 ** q
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) + .6 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR)
    return .22 * y * np.sin(np.pi * t / d) ** 2


fall = lambda c: rise(c, False)


def reverb(rt, n):   # stereo hall: decaying, darkening noise
    t = ts(rt * 1.6); ir = np.stack([bp(rng.standard_normal(len(t)), 150, 5000) for _ in range(2)], 1) * np.exp(-t * 6.9 / rt)[:, None]
    ir[:int(.012 * SR)] = 0; return ir / np.sqrt((ir ** 2).sum(0))


def convolve(x, ir):
    m = len(x) + len(ir); N = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[:len(x)]


KINDS = dict(key=key, tap=tap, air=air, glass=glass, sub=sub, rise=rise, fall=fall, tick=tick, whoosh=whoosh, pop=pop, impact=impact, ding=ding, chime=chime, count=count, flip=flip, shutter=shutter, paper=paper, scan=scan)

if __name__ == '__main__':
    src, dst = sys.argv[1:3]; S = json.load(open(src)); n = int(S['dur'] * SR); mix = np.zeros((n, 2)); wet = np.zeros(n)
    for c in S['cues']:
        s = KINDS[c['k']](c) * c.get('g', 1); o = int(max(0, c['t']) * SR)
        if o >= n: continue
        s = s[:n - o]; pan = c.get('pan', 0)
        wet[o:o + len(s)] += s * c.get('wet', 0)
        if c['k'] in ('whoosh', 'air'):   # whooshes travel across the stereo field
            pr = np.linspace(pan if pan else -.6, -pan if pan else .6, len(s))
        else: pr = np.full(len(s), pan)
        mix[o:o + len(s), 0] += s * np.sqrt((1 - pr) / 2) * 1.41; mix[o:o + len(s), 1] += s * np.sqrt((1 + pr) / 2) * 1.41
    if S.get('reverb'):
        ir = reverb(S['reverb'].get('rt', 1.8), n)
        for ch in (0, 1): mix[:, ch] += S['reverb'].get('mix', .5) * convolve(wet, ir[:, ch]) * 6
    mix /= max(1e-9, np.abs(mix).max()) / .9
    with wave.open(dst, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
    print(f"{len(S['cues'])} cues, {S['dur']} s -> {dst}")
