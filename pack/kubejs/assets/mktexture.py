#!/usr/bin/env python3
"""
mktexture.py — generate placeholder Ganymede block textures (16x16 PNG).

Hardcoded palettes and output paths:
  - pack/kubejs/assets/kubejs/textures/block/ganymede_grooved_ice.png
  - pack/kubejs/assets/kubejs/textures/block/ganymede_compacted_ice.png
  - pack/kubejs/assets/kubejs/textures/block/ganymede_regolith.png
  - pack/kubejs/assets/kubejs/textures/block/ganymede_dark_dust.png

Usage:
  python3 pack/kubejs/assets/mktexture.py

Notes:
  - Uses a fixed RNG seed for repeatable output.
  - Style: noise-based rocky/ice patterns with subtle banding on grooved ice.
  - Palette draws from dark purples/lavenders and grayish green/browns.
"""

from PIL import Image
import random, os, math


def main():
    root = os.path.join('pack', 'kubejs', 'assets', 'kubejs', 'textures', 'block')
    os.makedirs(root, exist_ok=True)

    # Palettes (RGB)
    palette_purples = [
        (70, 52, 88),   # deep purple
        (102, 77, 128), # purple
        (135, 109, 170),# lavender
        (170, 148, 206) # pale lavender
    ]
    palette_greys = [
        (72, 72, 76),
        (96, 98, 100),
        (128, 130, 132),
        (156, 158, 160),
    ]
    palette_earth = [
        (98, 96, 86),   # gray-brown
        (116, 112, 102),
        (124, 128, 112),# gray-green
        (138, 142, 126),
    ]

    rng = random.Random(42)

    def jitter(c, j=6):
        r, g, b = c
        return (
            max(0, min(255, r + rng.randint(-j, j))),
            max(0, min(255, g + rng.randint(-j, j))),
            max(0, min(255, b + rng.randint(-j, j))),
        )

    def mix(a, b, t):
        return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))

    def noise_tile(colors, darker=1.0, grooves=False, speckles=False):
        img = Image.new('RGB', (16, 16))
        px = img.load()
        for y in range(16):
            for x in range(16):
                base = colors[rng.randrange(len(colors))]
                # subtle banding for grooves: modulate with a sine on y
                if grooves:
                    t = (math.sin((y / 16.0) * math.tau * 2) + 1) / 2  # 0..1
                    band = mix(palette_purples[1], palette_greys[2], t * 0.4)
                    base = mix(base, band, 0.35)
                col = jitter(base, 8)
                if speckles and rng.random() < 0.08:
                    # occasional darker speckle clusters
                    col = mix(col, palette_greys[0], 0.6)
                px[x, y] = tuple(int(c * darker) for c in col)
        return img

    # Define Ganymede textures
    tex_specs = [
        ('ganymede_grooved_ice.png', noise_tile(
            colors=[palette_purples[2], palette_greys[2], palette_earth[2]], grooves=True, speckles=False
        )),
        ('ganymede_compacted_ice.png', noise_tile(
            colors=[palette_purples[1], palette_greys[1], palette_earth[1]], grooves=False, speckles=False, darker=0.90
        )),
        ('ganymede_regolith.png', noise_tile(
            colors=[palette_greys[2], palette_earth[2], palette_earth[0]], grooves=False, speckles=True
        )),
        ('ganymede_dark_dust.png', noise_tile(
            colors=[palette_purples[0], palette_greys[0], palette_earth[0]], grooves=False, speckles=True, darker=0.88
        )),
    ]

    # Callisto palettes (creams, browns, mossy greens)
    callisto_creams = [
        (214, 203, 176),  # light cream
        (198, 186, 160),
        (184, 171, 147),
    ]
    callisto_browns = [
        (142, 120, 96),
        (124, 103, 84),
        (106, 90, 72),
    ]
    callisto_mossy = [
        (124, 132, 106),
        (112, 120, 98),
        (100, 110, 90),
    ]

    # Define Callisto textures
    tex_specs += [
        ('callisto_regolith.png', noise_tile(
            colors=[callisto_browns[0], callisto_browns[1], callisto_creams[2]], grooves=False, speckles=True
        )),
        ('callisto_compact_regolith.png', noise_tile(
            colors=[callisto_browns[1], callisto_browns[2], callisto_creams[1]], grooves=False, speckles=False, darker=0.92
        )),
        ('callisto_olivine_dust.png', noise_tile(
            colors=[callisto_mossy[0], callisto_mossy[1], callisto_browns[0]], grooves=False, speckles=True
        )),
        ('callisto_light_regolith.png', noise_tile(
            colors=[callisto_creams[0], callisto_creams[1], callisto_browns[0]], grooves=False, speckles=False
        )),
    ]

    for name, img in tex_specs:
        path = os.path.join(root, name)
        img.save(path, 'PNG')
        print('wrote', path)


if __name__ == '__main__':
    main()
