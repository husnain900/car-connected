import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

src_path = r"C:\Users\LENOVO\.gemini\antigravity\brain\3b284752-eaf1-4222-a9d0-ae9da713f5b5\tesla_roadster_2026_silver_1794658046195.jpg"
out_dir = r"d:\car-connected\public\assets\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGB")
w, h = img.size
arr = np.array(img, dtype=np.float32)

# Estimate background color from perimeter
perimeter = np.concatenate([arr[0, :], arr[-1, :], arr[:, 0], arr[:, -1]], axis=0)
bg_color = np.median(perimeter, axis=0)
print(f"Detected background color: {bg_color}")

# Distance from background color
dist = np.linalg.norm(arr - bg_color, axis=2)

# Background seed mask (high confidence background)
bg_candidate = (dist < 18).astype(np.uint8) * 255
mask_img = Image.fromarray(bg_candidate, mode="L")

# Floodfill from multiple perimeter points to capture all connected background
draw = ImageDraw.Draw(mask_img)
for x in range(0, w, 20):
    ImageDraw.floodfill(mask_img, (x, 0), 128, thresh=12)
    ImageDraw.floodfill(mask_img, (x, h - 1), 128, thresh=12)
for y in range(0, h, 20):
    ImageDraw.floodfill(mask_img, (0, y), 128, thresh=12)
    ImageDraw.floodfill(mask_img, (w - 1, y), 128, thresh=12)

mask_arr = np.array(mask_img)
is_ext_bg = (mask_arr == 128)

# Alpha channel: start with 255 (fully opaque)
alpha = np.ones((h, w), dtype=np.float32) * 255.0

# Soft edge feathering using distance field
# Exterior background becomes 0 (fully transparent)
alpha[is_ext_bg] = 0.0

# Smooth the boundary: feather edges slightly with Gaussian blur on the mask
alpha_img = Image.fromarray(alpha.astype(np.uint8), mode="L")
# Apply slight blur for sub-pixel anti-aliasing
blurred_alpha = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.2))

# Composite into RGBA
rgba_img = img.convert("RGBA")
rgba_img.putalpha(blurred_alpha)

# Also create a version with clean contact shadow underneath
# Save targets
targets = [
    os.path.join(out_dir, "tesla-roadster-transparent.png"),
    os.path.join(out_dir, "hyperion-gt-hero.png"),
    os.path.join(out_dir, "hyperion-gt-angle.png"),
]

for t in targets:
    rgba_img.save(t, format="PNG", optimize=True)
    print(f"Saved transparent PNG to {t} ({os.path.getsize(t)} bytes)")

# Also save high-res JPEG versions for studio 2D mode
jpg_targets = [
    os.path.join(out_dir, "tesla-roadster-studio.jpg"),
    os.path.join(out_dir, "hyperion-gt-hero.jpg"),
    os.path.join(out_dir, "hyperion-gt-angle.jpg"),
]

for jt in jpg_targets:
    img.save(jt, format="JPEG", quality=95)
    print(f"Saved studio JPEG to {jt} ({os.path.getsize(jt)} bytes)")

print("Processing complete!")
