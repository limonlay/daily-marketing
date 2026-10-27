#!/usr/bin/env python3
"""Daily sound design, made from scratch in code: tactile, musical, clean, spacious ("like an Apple product").
Every pitch sits in D major pentatonic (D E F# A B), so all sounds agree with each other.

    python3 sound.py cues.json out.wav     # a film's track (cue sheet from cues.cjs + the film's sound.json)
    python3 sound.py --kit out_dir         # every sound as its own wav, for editing by hand

Kinds (cue: {"t": s, "k": kind, "g": gain, "wet": reverb send 0-1, "pan": -1..1, ...}; notes as "D6" or Hz):
  touch    a fingertip on glass/ceramic (modal synthesis)   "note", "hard" 0-1
  key      a typed letter: tiny, high, soft touch
  glint    FM glass bell, bright attack -> pure tail        "notes" [..], "gap" s, "dec" s
  breath   air passing (pink noise, resonant band gliding) "dur", "f0", "f1"
  thum     soft felt low hit under a key moment
  sparkle  tiny glints in a run, for a counter              "dur", "up" true/false
  capture  two-tone touch + a short breath (snap a photo)
  light    a soft rising tone for a scan                    "dur"
  pad      warm held chord for the end card                 "notes", "dur", "att", "rel"
"""
import json, os, sys, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(11)
NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
PENTA = ['D', 'E', 'F#', 'A', 'B']


def hz(n):
    if not isinstance(n, str): return float(n)
    name, octv = n[:-1], int(n[-1]); return 440 * 2 ** ((12 * (octv + 1) + NAMES.index(name) - 69) / 12)


def T(d): return np.arange(int(d * SR)) / SR


def attack(n, a):   # raised-cosine attack: no clicks
    e = np.ones(n); k = min(n, max(1, int(a * SR))); e[:k] = .5 - .5 * np.cos(np.pi * np.arange(k) / k); return e


def st(x, pan=0.):   # mono -> stereo, equal power
    p = np.clip(pan, -1, 1); return np.stack([x * np.sqrt((1 - p) / 2), x * np.sqrt((1 + p) / 2)], 1) * 1.414


def band(x, lo, hi):   # smooth FFT band-pass
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / (1 + (lo / np.maximum(f, 1)) ** 4) / (1 + (f / hi) ** 4), len(x))


def pink(n):
    X = np.fft.rfft(rng.standard_normal(n)); f = np.fft.rfftfreq(n, 1 / SR); X /= np.sqrt(np.maximum(f, 20))
    y = np.fft.irfft(X, n); return y / np.abs(y).max()


# ---------------------------------------------------------------- sounds
def touch(c):
    f = hz(c.get('note', 'D6')); h = c.get('hard', .5); t = T(.7)
    modes = [(1, 1, .16), (2.76, .32 * h, .05), (5.40, .14 * h, .02), (8.93, .06 * h, .009)]   # a small free plate
    y = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / d) for r, a, d in modes if f * r < 18000)
    y += .25 * np.sin(2 * np.pi * f / 4 * t) * np.exp(-t / .02)                                 # the body under the finger
    return st(.33 * y * attack(len(t), .0008), c.get('pan', 0))


def key(c):
    f = hz(rng.choice(PENTA) + '7') * rng.uniform(.99, 1.01); t = T(.06)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / .006) + .3 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / .002)
    return st(.18 * y * attack(len(t), .0004), rng.uniform(-.25, .25))


def glint(c):
    notes = [hz(n) for n in c.get('notes', ['D6'])]; gap = c.get('gap', .06); dec = c.get('dec', 1.4)
    d = dec * 3 + gap * len(notes); out = np.zeros((int(d * SR), 2))
    for i, f in enumerate(notes):
        t = T(d - i * gap); idx = 1.8 * np.exp(-t / .12) + .15                                  # bright strike -> pure tone
        y = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * 2 * t)) * np.exp(-t / dec)
        y += .2 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t / (dec * .25))                   # a little glass sparkle
        o = int(i * gap * SR); pan = (i / max(1, len(notes) - 1) - .5) * .6
        out[o:o + len(y)] += st(y * attack(len(y), .003) * (1 - .06 * i), pan)
    return .32 * out


def breath(c):
    d = c.get('dur', .6); n = int(d * SR); f0, f1 = c.get('f0', 400), c.get('f1', 2600); q = 1.3
    out = np.zeros((n, 2)); fc = f0 * (f1 / f0) ** (np.arange(n) / n)
    for ch in (0, 1):   # Chamberlin state-variable band-pass, centre gliding
        x = pink(n); lp = bpv = 0.; y = np.zeros(n); F = 2 * np.sin(np.pi * np.minimum(fc, SR / 6) / SR)
        for i in range(n):
            hp = x[i] - lp - bpv / q; bpv += F[i] * hp; lp += F[i] * bpv; y[i] = bpv
        out[:, ch] = y
    u = np.arange(n) / n; env = np.where(u < .6, np.sin(np.pi / 2 * u / .6) ** 2, np.cos(np.pi / 2 * (u - .6) / .4) ** 2)
    out *= env[:, None] / max(1e-9, np.abs(out).max())
    p = c.get('pan', 0); g = np.linspace(-p, p, n) if p else np.zeros(n)   # moves across the stereo field
    out[:, 0] *= np.sqrt((1 - g) / 2) * 1.414; out[:, 1] *= np.sqrt((1 + g) / 2) * 1.414
    return .8 * out


def thum(c):
    t = T(.8); f = 62 * (1 + .5 * np.exp(-t / .03))
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .22) + .2 * np.sin(2 * np.pi * np.cumsum(2 * f) / SR) * np.exp(-t / .1)
    return st(.9 * y * attack(len(t), .004))


def sparkle(c):
    d = c.get('dur', 1); up = c.get('up', True); n = int(d * 20); out = np.zeros((int((d + 1) * SR), 2))
    scale = [hz(p + o) for o in '67' for p in PENTA]
    for i in range(n):
        q = i / max(1, n - 1); tt = d * (1 - (1 - q) ** 1.8)                                   # dense first, like the number
        k = int(q * (len(scale) - 1)) if up else int((1 - q) * (len(scale) - 1))
        g = glint({'notes': [scale[k]], 'dec': .18})[: int(.6 * SR)] * (.5 + .5 * (q if up else 1 - q))
        o = int(tt * SR); pan = rng.uniform(-.6, .6); g = g * [np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)]
        out[o:o + len(g)] += g
    return .55 * out


def capture(c):
    a = touch({'note': 'A5', 'hard': .7}); b = touch({'note': 'D6', 'hard': .5}) * .8; br = breath({'dur': .3, 'f0': 1500, 'f1': 5000}) * .35
    out = np.zeros((len(a) + int(.08 * SR), 2)); out[:len(a)] += a; o = int(.07 * SR); out[o:o + len(b)] += b; out[:len(br)] += br
    return out


def light(c):
    d = c.get('dur', 1); t = T(d); f = hz('A5') * (hz('D6') / hz('A5')) ** (t / d)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) + .5 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR)
    y *= np.sin(np.pi * t / d) ** 2
    return .14 * st(y) + .25 * breath({'dur': d, 'f0': 2000, 'f1': 6000})


def pad(c):
    d = c.get('dur', 3); att = c.get('att', .5); rel = c.get('rel', 1.2); t = T(d); y = np.zeros((len(t), 2))
    for i, nn in enumerate(c.get('notes', ['D4', 'A4', 'E5', 'F#5'])):
        f = hz(nn)
        for cents, pan in ((-5, -.7), (0, 0), (5, .7)):   # three slightly detuned voices, spread
            ff = f * 2 ** (cents / 1200); v = np.sin(2 * np.pi * ff * t + rng.uniform(0, 6.28)) + .12 * np.sin(4 * np.pi * ff * t)
            y += st(v, pan) / 3
    env = attack(len(t), att); r = int(rel * SR); env[-r:] *= .5 + .5 * np.cos(np.pi * np.arange(r) / r)
    return .12 * y * env[:, None]


KINDS = dict(touch=touch, key=key, glint=glint, breath=breath, thum=thum, sparkle=sparkle, capture=capture, light=light, pad=pad)


# ---------------------------------------------------------------- space + mix
def room(rt=2.0):
    """Stereo room: early reflections + a diffuse tail whose highs die first (like a real hall)."""
    n = int(rt * 1.4 * SR); ir = np.zeros((n, 2)); t = np.arange(n) / SR
    for i in range(14):   # early reflections, 7-70 ms, alternating sides
        k = int(rng.uniform(.007, .07) * SR); ir[k, i % 2] += .55 * (1 - i / 16) * rng.choice([-1, 1])
    for lo, hi, r in ((20, 700, rt * 1.15), (700, 4000, rt), (4000, 16000, rt * .45)):
        for ch in (0, 1): ir[:, ch] += .5 * band(rng.standard_normal(n), lo, hi) * np.exp(-t * 6.9 / r) * np.minimum(1, t / .03)
    return ir / np.sqrt((ir ** 2).sum(0))


def conv(x, h):
    N = 1 << (len(x) + len(h) - 1).bit_length(); return np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(h, N), N)[:len(x)]


def render(S):
    n = int(S['dur'] * SR); dry = np.zeros((n, 2)); wet = np.zeros((n, 2))
    for c in S['cues']:
        s = KINDS[c['k']](c) * c.get('g', 1); o = int(max(0, c['t']) * SR)
        if o >= n: continue
        s = s[:n - o]; dry[o:o + len(s)] += s; wet[o:o + len(s)] += s * c.get('wet', .3)
    rv = S.get('room', {}); ir = room(rv.get('rt', 2.0))
    mix = dry + rv.get('mix', .6) * np.stack([conv(wet[:, 0], ir[:, 0]), conv(wet[:, 1], ir[:, 1])], 1)
    mix = np.tanh(1.3 * mix / np.abs(mix).max()) / np.tanh(1.3)   # gentle glue on the peaks
    return .89 * mix / np.abs(mix).max()


def write(mix, dst):
    with wave.open(dst, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix, -1, 1) * 32767).astype('<i2').tobytes())


KIT = {   # name: (seconds, cues) -- the same palette, one sound per file
    'touch-low': (1.4, [dict(k='touch', note='A5')]), 'touch-mid': (1.4, [dict(k='touch', note='D6')]),
    'touch-high': (1.4, [dict(k='touch', note='A6')]),
    'touch-run-6': (3.2, [dict(k='touch', note=nn, t=i * .32, pan=(-.3, .3)[i % 2]) for i, nn in enumerate(['A5', 'B5', 'D6', 'E6', 'F#6', 'A6'])]),
    'key': (.5, [dict(k='key', wet=.1)]), 'breath-short': (1.4, [dict(k='breath', dur=.5, pan=.5)]),
    'breath-long': (2.2, [dict(k='breath', dur=1.1, f0=300, f1=3000)]), 'thum': (1.6, [dict(k='thum', wet=.2)]),
    'glint-2-hook': (4, [dict(k='thum', g=.6), dict(k='glint', notes=['A5', 'D6'], gap=.04, wet=.5)]),
    'glint-3-saved': (4, [dict(k='glint', notes=['D6', 'F#6', 'A6'], gap=.055, dec=1.3, wet=.55)]),
    'sparkle-up': (2.2, [dict(k='sparkle', dur=.9)]), 'sparkle-down': (2.6, [dict(k='sparkle', dur=1.3, up=False)]),
    'capture': (1.6, [dict(k='capture', wet=.25)]), 'light': (2.2, [dict(k='light', dur=1.0)]),
    'logo': (6, [dict(k='thum'), dict(k='pad', dur=3.4), dict(k='glint', notes=['D5', 'A5', 'D6', 'F#6', 'A6'], gap=.085, dec=2.0, wet=.65)]),
}

if __name__ == '__main__':
    if sys.argv[1] == '--kit':
        out = sys.argv[2]; os.makedirs(out, exist_ok=True)
        for name, (d, cues) in KIT.items():
            write(render({'dur': d, 'room': {'rt': 2.0, 'mix': .6}, 'cues': [{'t': 0, 'wet': .4, **c} for c in cues]}), os.path.join(out, name + '.wav'))
        print(len(KIT), 'sounds ->', out)
    else:
        S = json.load(open(sys.argv[1])); write(render(S), sys.argv[2]); print(f"{len(S['cues'])} cues, {S['dur']} s -> {sys.argv[2]}")
