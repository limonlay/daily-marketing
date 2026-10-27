#!/usr/bin/env python3
"""The calm sound kit as separate files, for editing by hand (CapCut, TikTok, Premiere):
    python3 sfxkit.py <out_dir>
Each file: one sound with its reverb tail, stereo 48 kHz wav, peak -1 dBFS. Made in code: no samples, no licences."""
import os, sys
import sfx

R = {'rt': 2.2, 'mix': .55}
KIT = {   # name: (length s, [cues])
    'key-soft':          (.4, [dict(k='key', wet=.15)]),
    'tap-low':           (1.2, [dict(k='tap', f=784, wet=.4)]),
    'tap-mid':           (1.2, [dict(k='tap', f=1047, wet=.4)]),
    'tap-high':          (1.2, [dict(k='tap', f=1568, wet=.45)]),
    'tap-double':        (1.3, [dict(k='tap', f=700, wet=.2), dict(k='tap', f=700, g=.7, wet=.2, t=.08)]),
    'taps-rising-5':     (2.6, [dict(k='tap', f=f, wet=.4, t=i * .32, pan=(-.3, .3)[i % 2]) for i, f in enumerate([784, 880, 1047, 1175, 1319])]),
    'air-short':         (1.4, [dict(k='air', dur=.45, wet=.3, pan=.5)]),
    'air-long':          (2.2, [dict(k='air', dur=1.0, wet=.3)]),
    'glass-2-hook':      (3.5, [dict(k='sub', g=.5), dict(k='glass', notes=[659, 988], gap=.05, decay=1.2, wet=.6)]),
    'glass-3-saved':     (3.5, [dict(k='glass', notes=[1047, 1319, 1568], gap=.06, decay=1.1, wet=.6)]),
    'glass-5-logo':      (5.5, [dict(k='sub', g=.5), dict(k='air', dur=.6, g=.4, wet=.4), dict(k='glass', notes=[523, 784, 1047, 1319, 1568], gap=.09, decay=1.8, wet=.7)]),
    'rise-1s':           (2.2, [dict(k='rise', dur=1.0, wet=.4)]),
    'fall-1s':           (2.2, [dict(k='fall', dur=1.0, wet=.4)]),
    'sub-soft':          (1.5, [dict(k='sub')]),
}
if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for name, (d, cues) in KIT.items():
        mix = sfx.render({'dur': d, 'reverb': R, 'cues': [{'t': 0, **c} for c in cues]}) / .9 * .891   # peak -1 dBFS
        sfx.write(mix, os.path.join(out, name + '.wav'))
    print(len(KIT), 'sounds ->', out)
