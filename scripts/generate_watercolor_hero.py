"""Render the IIFR home hero as an original, high-texture watercolour raster.

The artwork keeps a dark navy text-safe field through the middle-left, with ochre
and maroon pigment masses at the edges. It is deliberately built at production
resolution so paper grain and dry-brush detail survive a normal hero crop.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

WIDTH, HEIGHT = 2400, 1125
OUTPUT = Path(__file__).parents[1] / "public/assets/images/contemporary/home-watercolor-hero.webp"
RNG = random.Random(20260807)

IVORY = (239, 235, 229)
OCHRE = (199, 153, 6)
NAVY = (36, 47, 76)
MAROON = (108, 19, 27)


def irregular_polygon(cx: float, cy: float, rx: float, ry: float, points: int, jitter: float) -> list[tuple[float, float]]:
    values = []
    phase = RNG.random() * math.tau
    for index in range(points):
        angle = phase + math.tau * index / points
        radius = 1 + RNG.uniform(-jitter, jitter)
        values.append((cx + math.cos(angle) * rx * radius, cy + math.sin(angle) * ry * radius))
    return values


def pigment_bloom(canvas: Image.Image, colour: tuple[int, int, int], cx: float, cy: float, rx: float, ry: float, layers: int, alpha: int) -> None:
    """Layer irregular transparent pools to mimic pigment blooms and tide marks."""
    for layer_index in range(layers):
        scale = 1 - (layer_index / layers) * 0.72
        layer = Image.new("RGBA", (WIDTH, HEIGHT))
        draw = ImageDraw.Draw(layer)
        for _ in range(3):
            x = cx + RNG.uniform(-rx * 0.11, rx * 0.11)
            y = cy + RNG.uniform(-ry * 0.12, ry * 0.12)
            polygon = irregular_polygon(x, y, rx * scale, ry * scale, 32, 0.18)
            draw.polygon(polygon, fill=(*colour, max(5, int(alpha / layers * RNG.uniform(0.7, 1.5)))))
        # Earlier pools stay feathered while later passes form visible pigments.
        layer = layer.filter(ImageFilter.GaussianBlur(max(2, int(18 * (1 - layer_index / layers)))))
        canvas.alpha_composite(layer)


def dry_brush(canvas: Image.Image, colour: tuple[int, int, int], y: float, amplitude: float, thickness: float, opacity: int) -> None:
    """Paint an imperfect horizontal brush stroke with dry gaps and bristle striations."""
    for bristle in range(8):
        layer = Image.new("RGBA", (WIDTH, HEIGHT))
        draw = ImageDraw.Draw(layer)
        offset = (bristle - 13) * thickness / 25
        points = []
        for x in range(-80, WIDTH + 120, 34):
            wave = math.sin(x / 180 + bristle * 0.39) * amplitude
            wobble = RNG.uniform(-amplitude * 0.28, amplitude * 0.28)
            points.append((x, y + offset + wave + wobble))
        draw.line(points, fill=(*colour, max(2, opacity - bristle * 7)), width=max(2, int(thickness / 8)))
        canvas.alpha_composite(layer.filter(ImageFilter.GaussianBlur(4)))


def paper_grain() -> Image.Image:
    """Cold-press paper with fibres, uneven absorption, and a warm ivory base."""
    pixels = []
    for _ in range(WIDTH * HEIGHT):
        noise = RNG.gauss(0, 7)
        pixels.append(tuple(max(0, min(255, int(channel + noise))) for channel in IVORY) + (255,))
    paper = Image.new("RGBA", (WIDTH, HEIGHT))
    paper.putdata(pixels)
    draw = ImageDraw.Draw(paper, "RGBA")
    for _ in range(4000):
        x = RNG.randrange(WIDTH)
        y = RNG.randrange(HEIGHT)
        length = RNG.choice((1, 1, 2, 3, 5, 8, 13))
        colour = (111, 97, 80, RNG.randrange(3, 11)) if RNG.random() < 0.48 else (255, 255, 255, RNG.randrange(3, 13))
        draw.line((x, y, x + length, y + RNG.choice((-1, 0, 0, 1))), fill=colour, width=1)
    return paper


def apply_pigment_granulation(canvas: Image.Image) -> None:
    """Apply clusters of transparent bloom edges and lifted pigment islands."""
    marks = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(marks, "RGBA")
    for _ in range(1200):
        x = RNG.randrange(WIDTH)
        y = RNG.randrange(120, 930)
        radius = RNG.choice((2, 3, 5, 8, 12, 18, 26))
        colour = (255, 248, 233, RNG.randrange(4, 28)) if RNG.random() < 0.62 else (33, 24, 36, RNG.randrange(3, 18))
        draw.ellipse((x - radius, y - radius * 0.55, x + radius, y + radius * 0.55), fill=colour)
    canvas.alpha_composite(marks.filter(ImageFilter.GaussianBlur(0.7)))


def main() -> None:
    canvas = paper_grain()

    # Multiple overlapping washes create recognisable IIFR colours at page scale.
    pigment_bloom(canvas, OCHRE, 180, 445, 560, 530, layers=10, alpha=320)
    pigment_bloom(canvas, NAVY, 900, 420, 1030, 605, layers=14, alpha=360)
    pigment_bloom(canvas, MAROON, 2060, 420, 620, 555, layers=12, alpha=350)
    pigment_bloom(canvas, NAVY, 1350, 690, 770, 230, layers=6, alpha=210)

    # Harder tide lines and brushwork retain a handmade quality after browser resizing.
    dry_brush(canvas, OCHRE, 205, 20, 54, 68)
    dry_brush(canvas, NAVY, 730, 24, 64, 72)
    dry_brush(canvas, MAROON, 815, 18, 48, 55)

    # Add localised wet-on-wet pools and lifted paper areas.
    for colour, centre in ((OCHRE, (380, 410)), (NAVY, (1060, 330)), (MAROON, (1980, 470)), (MAROON, (2180, 740))):
        for _ in range(16):
            layer = Image.new("RGBA", (WIDTH, HEIGHT))
            draw = ImageDraw.Draw(layer)
            cx = centre[0] + RNG.uniform(-260, 260)
            cy = centre[1] + RNG.uniform(-220, 220)
            polygon = irregular_polygon(cx, cy, RNG.uniform(70, 200), RNG.uniform(45, 150), 24, 0.28)
            draw.line(polygon + [polygon[0]], fill=(*colour, RNG.randrange(24, 63)), width=RNG.randrange(3, 11))
            canvas.alpha_composite(layer.filter(ImageFilter.GaussianBlur(RNG.uniform(1.2, 4.5))))

    apply_pigment_granulation(canvas)

    # The lower paper reveal gives the hero an organic landing into the ivory page.
    fade = Image.new("L", (WIDTH, HEIGHT))
    fade_pixels = []
    for y in range(HEIGHT):
        start = int(HEIGHT * 0.72)
        ratio = max(0, min(1, (y - start) / (HEIGHT - start)))
        fade_pixels.extend([int(255 * ratio * ratio)] * WIDTH)
    fade.putdata(fade_pixels)
    ivory = Image.new("RGBA", (WIDTH, HEIGHT), (*IVORY, 255))
    canvas = Image.composite(ivory, canvas, fade)

    # One final low-opacity fibre pass keeps the ivory reveal tangible.

    # Preserve the intended texture while producing a production-friendly asset.
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUTPUT, "WEBP", quality=91, method=6)
    print(OUTPUT)


if __name__ == "__main__":
    main()
