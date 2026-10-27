#!/usr/bin/env python3
"""Gates for a finished Daily film. Prints numbers; a FAIL is fixed, not argued.

    python3 check.py film.mp4 [--expect 15] [--beats beats.json] [--sheet out/contact.png]

G0 render   decodes, duration matches --expect (+-0.1 s), picture moves, audio present and not silent
G1 flat     no run of > 3 consecutive flat (single-colour) frames
G2 frozen   no frozen stretch > 1.0 s before the final shot (keep something alive)
G3 end      end hold (picture unchanged at the end) <= 1.4 s
G4 loudness integrated -14 LUFS +-1, true peak <= -1 dBTP
G5 sync     (with --beats) >= 80 % of detected cuts land within 50 ms + 1.5 frames of a beat
Also writes a contact sheet (2 fps) and a phone-width sheet (1 fps, 360 px) for the by-eye review.
Needs ffmpeg/ffprobe and numpy.
"""
import argparse, json, os, re, subprocess, sys
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('video'); ap.add_argument('--expect', type=float); ap.add_argument('--beats')
ap.add_argument('--sheet'); ap.add_argument('--silent', action='store_true', help='silent master: no audio expected, G4 skipped')
a = ap.parse_args()
v = a.video
run = lambda *c: subprocess.run(c, capture_output=True, text=True)

info = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', v).stdout or '{}')
streams = info.get('streams', [])
vs = next((s for s in streams if s['codec_type'] == 'video'), None)
has_audio = any(s['codec_type'] == 'audio' for s in streams)
if not vs: print('G0 render   FAIL  no video stream'); sys.exit(1)
dur = float(info['format']['duration']); fps = eval(vs['r_frame_rate'])

# small grey frames for analysis
w, h = 90, 160
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', v, '-vf', f'scale={w}:{h},format=gray', '-f', 'rawvideo', '-'],
                     capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, h, w).astype(np.float32)
n = len(fr)
diff = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)) if n > 1 else np.zeros(1)
flat = fr.std(axis=(1, 2)) < 2.0
res = []

ok0 = (a.expect is None or abs(dur - a.expect) <= 0.1) and diff.max() > 1 and (has_audio or a.silent)
silent = False
if has_audio:
    vd = run('ffmpeg', '-i', v, '-af', 'volumedetect', '-vn', '-f', 'null', '-').stderr
    m = re.search(r'mean_volume: (-?[\d.]+) dB', vd); silent = bool(m and float(m.group(1)) < -60)
    ok0 = ok0 and not silent
res.append(('G0 render', ok0, f'{dur:.2f} s{"" if a.expect is None else f" (expect {a.expect:g})"}, {n} frames @ {fps:g} fps, '
            f'audio {"yes" if has_audio else "NO"}{" but silent" if silent else ""}'))

runs, cur = 0, 0
for f in flat: cur = cur + 1 if f else 0; runs = max(runs, cur)
res.append(('G1 flat', runs <= 3, f'longest flat run {runs} frames'))

still = diff < 0.12                        # slow drift / float still counts as alive
# end hold
hold = 0
for s in still[::-1]:
    if not s: break
    hold += 1
endhold = hold / fps
# longest frozen stretch before the end hold
body = still[:len(still) - hold]; best, cur, at, start = 0, 0, 0, 0
for i, s in enumerate(body):
    if s:
        if cur == 0: start = i
        cur += 1
        if cur > best: best, at = cur, start
    else: cur = 0
res.append(('G2 frozen', best / fps <= 1.0, f'longest frozen stretch {best / fps:.2f} s at {at / fps:.2f} s'))
res.append(('G3 end', endhold <= 1.4, f'end hold {endhold:.2f} s'))

if has_audio:
    ln = run('ffmpeg', '-i', v, '-af', 'loudnorm=print_format=json', '-vn', '-f', 'null', '-').stderr
    js = json.loads(ln[ln.rfind('{'):ln.rfind('}') + 1])
    I, TP = float(js['input_i']), float(js['input_tp'])
    res.append(('G4 loudness', abs(I + 14) <= 1 and TP <= -1, f'{I:.1f} LUFS, true peak {TP:.1f} dBTP'))

raw_cuts = [i for i, d in enumerate(diff) if d > max(12, 6 * np.median(diff) + 4)]
cuts = []                                    # one cut per cluster (fast moves and motion blur spread a cut over frames)
for i in raw_cuts:
    if cuts and i - cuts[-1][0] <= fps * .25:
        if diff[i] > diff[cuts[-1][0]]: cuts[-1] = (i, diff[i])
    else: cuts.append((i, diff[i]))
cuts = [(i + 1) / fps for i, _ in cuts if (i + 1) / fps > .2]   # frame 0 arrivals are not cuts
if a.beats:
    B = np.array(json.load(open(a.beats)))
    hit = [c for c in cuts if np.min(np.abs(B - c)) <= 0.05 + 1.5 / fps]
    pct = 100 * len(hit) / len(cuts) if cuts else 100
    res.append(('G5 sync', pct >= 80, f'{len(hit)}/{len(cuts)} cuts on a beat ({pct:.0f} %)'))

for name, ok, msg in res: print(f'{name:<12}{"PASS" if ok else "FAIL"}  {msg}')
print(f'cuts         {len(cuts)} at ' + ', '.join(f'{c:.2f}' for c in cuts[:20]))
print(f'motion       mean frame change {diff.mean():.2f}/255 (lively promo ~3-8)')

base = os.path.splitext(a.sheet or v)[0]
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', v, '-vf', 'fps=2,scale=180:-2,tile=10x3', '-frames:v', '1', base + '_contact.png'])
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', v, '-vf', 'fps=1,scale=360:-2,tile=5x3', '-frames:v', '1', base + '_phone.png'])
print(f'sheets       {base}_contact.png  {base}_phone.png  (look at them before judging)')
sys.exit(0 if all(ok for _, ok, _ in res) else 1)
