#!/usr/bin/env python3
"""Generate PrintPick printer product images with OpenAI DALL-E 3."""

from __future__ import annotations

import base64
import os
import sys
import urllib.request
from pathlib import Path


OUTPUT_DIR = (
    Path(__file__).resolve().parents[1]
    / "public"
    / "images"
    / "printers"
)

BASE_PROMPT = (
    "Photorealistic 3D printer product image on a pure white background, "
    "3/4 front-right angle, professional ecommerce product photography, "
    "sharp focus, realistic materials, accurate form factor, centered full "
    "printer visible, no people, no props, no text labels except authentic "
    "small manufacturer branding where specified."
)

PRINTERS = [
    {
        "name": "Creality K1C",
        "filename": "creality-k1c.png",
        "details": (
            "enclosed CoreXY FDM printer, glass front door, grey and black "
            "chassis, visible Creality logo"
        ),
    },
    {
        "name": "Prusa Mini+",
        "filename": "prusa-mini-plus.png",
        "details": (
            "compact open-frame bed slinger, orange stepper motor covers and "
            "orange frame trim, small 180mm heated bed, Prusa Research branding"
        ),
    },
    {
        "name": "Creality Ender 3 V3 Plus",
        "filename": "creality-ender-3-v3-plus.png",
        "details": (
            "large open-frame FDM bed slinger with 300x300mm heated bed, dual "
            "Y-axis motors, CoreXZ gantry, dark grey chassis"
        ),
    },
    {
        "name": "QIDI X-CF Pro",
        "filename": "qidi-x-cf-pro.png",
        "details": (
            "fully enclosed industrial FDM printer, boxy enclosure with front "
            "door, dual extruder print head, heavy chassis designed for carbon "
            "fiber printing"
        ),
    },
    {
        "name": "Elegoo Neptune 4 Plus",
        "filename": "elegoo-neptune-4-plus.png",
        "details": (
            "open-frame FDM printer, 320mm heated bed, direct drive extruder, "
            "grey and orange accents, Elegoo branding"
        ),
    },
]


def fail(message: str, exit_code: int = 1) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(exit_code)


def get_openai_client():
    if not os.getenv("OPENAI_API_KEY"):
        fail("OPENAI_API_KEY is not set in the environment.", 2)

    try:
        from openai import OpenAI
    except ModuleNotFoundError as exc:
        fail("The openai Python package is not installed. Install it with: python3 -m pip install openai", 3)

    return OpenAI()


def save_image(image_data, output_path: Path) -> None:
    if getattr(image_data, "b64_json", None):
        output_path.write_bytes(base64.b64decode(image_data.b64_json))
        return

    if getattr(image_data, "url", None):
        with urllib.request.urlopen(image_data.url, timeout=120) as response:
            output_path.write_bytes(response.read())
        return

    fail(f"No image payload returned for {output_path.name}.")


def main() -> None:
    client = get_openai_client()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Saving images to: {OUTPUT_DIR}")
    for index, printer in enumerate(PRINTERS, start=1):
        output_path = OUTPUT_DIR / printer["filename"]
        prompt = f"{BASE_PROMPT} Product: {printer['name']}. Details: {printer['details']}."

        print(f"[{index}/{len(PRINTERS)}] Generating {printer['name']} -> {output_path.name}")
        result = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )

        save_image(result.data[0], output_path)
        print(f"[{index}/{len(PRINTERS)}] Saved {output_path}")

    print("Done.")


if __name__ == "__main__":
    main()
