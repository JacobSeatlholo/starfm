#!/usr/bin/env python3
"""Convert Star FM Logo.svg to optimized PNGs at multiple sizes.

The SVG is 215KB because it contains an embedded base64 JPEG. We'll render
it to high-res PNGs and also produce a cleaned, smaller SVG variant.
"""
import os
import re
import cairosvg
from PIL import Image
import io

SRC = "/home/z/my-project/upload/Star FM Logo.svg"
OUT_DIR = "/home/z/my-project/public"
os.makedirs(OUT_DIR, exist_ok=True)

# Read SVG source
with open(SRC, "r", encoding="utf-8") as f:
    svg_text = f.read()

# The SVG viewBox is 1190.55 x 841.89 (landscape, ~1.41:1)
# Render at high resolution, then we'll create variants.
print(f"Source SVG size: {len(svg_text)} chars")

# 1) Full logo on white background (as designed) — for og:image, hero
print("Rendering full logo PNG (1200w)...")
cairosvg.svg2png(
    bytestring=svg_text.encode("utf-8"),
    write_to=f"{OUT_DIR}/starfm-logo-full.png",
    output_width=1200,
    output_height=848,
    background_color="white",
)
print("  -> starfm-logo-full.png")

# 2) Render at 2x for retina hero
print("Rendering hero logo PNG (1600w)...")
cairosvg.svg2png(
    bytestring=svg_text.encode("utf-8"),
    write_to=f"{OUT_DIR}/starfm-logo-hero.png",
    output_width=1600,
    output_height=1133,
    background_color="white",
)
print("  -> starfm-logo-hero.png")

# 3) Square nav favicon version (render then crop to square centered)
print("Rendering square logo (512x512)...")
# Render full then center-crop to square
png_bytes = cairosvg.svg2png(
    bytestring=svg_text.encode("utf-8"),
    output_width=1190,
    output_height=841,
    background_color="white",
)
img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
w, h = img.size
# Center square crop
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
square = img.crop((left, top, left + side, top + side))
square_resized = square.resize((512, 512), Image.LANCZOS)
square_resized.save(f"{OUT_DIR}/starfm-logo-square.png", "PNG", optimize=True)
print("  -> starfm-logo-square.png (512x512)")

# 4) Small favicon (64x64)
square_resized.resize((64, 64), Image.LANCZOS).save(
    f"{OUT_DIR}/starfm-logo-64.png", "PNG", optimize=True
)
print("  -> starfm-logo-64.png (64x64)")

# 5) Try to create a transparent-background version by making white pixels transparent
# This helps blend the logo on dark backgrounds
print("Creating transparent-background variant...")
# Use the square version for the transparent icon
# Make near-white pixels transparent
rgba = square_resized.copy()
data = rgba.getdata()
new_data = []
for item in data:
    r, g, b, a = item
    # If pixel is near-white (background), make it transparent
    if r > 240 and g > 240 and b > 240:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append((r, g, b, a))
rgba.putdata(new_data)
rgba.save(f"{OUT_DIR}/starfm-logo-mono.png", "PNG", optimize=True)
print("  -> starfm-logo-mono.png (512x512 transparent)")

# Also make a transparent version of the full logo
print("Creating transparent full logo...")
png_bytes2 = cairosvg.svg2png(
    bytestring=svg_text.encode("utf-8"),
    output_width=1200,
    output_height=848,
)
img2 = Image.open(io.BytesIO(png_bytes2)).convert("RGBA")
data2 = img2.getdata()
new_data2 = []
for item in data2:
    r, g, b, a = item
    if r > 240 and g > 240 and b > 240:
        new_data2.append((255, 255, 255, 0))
    else:
        new_data2.append((r, g, b, a))
img2.putdata(new_data2)
img2.save(f"{OUT_DIR}/starfm-logo-transparent.png", "PNG", optimize=True)
print("  -> starfm-logo-transparent.png (1200x848 transparent)")

# 6) Extract the dominant green colors used in the SVG for the design system
green_matches = re.findall(r'fill:?(#[0-9A-Fa-f]{6})', svg_text)
greens = set(green_matches)
print(f"\nGreen colors found in SVG: {sorted(greens)}")

# Print file sizes
print("\nGenerated files:")
for fname in sorted(os.listdir(OUT_DIR)):
    if fname.startswith("starfm-logo"):
        fpath = os.path.join(OUT_DIR, fname)
        size_kb = os.path.getsize(fpath) / 1024
        print(f"  {fname}: {size_kb:.1f} KB")

print("\nDone.")
