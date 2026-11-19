#!/usr/bin/env python3
"""Screenshot every Brolly example page.

Usage: python3 tests/shots.py [dawn|noon|dusk|night] [name ...]
Expects `npm run preview` (python http.server on :4173) to be running.
Output goes to $BROLLY_SHOTS_DIR, or a temporary directory by default.
Requires Playwright and Pillow.
"""
import os
import pathlib
import shutil
import sys
import tempfile

from PIL import Image
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173/examples"
WIDTH, HEIGHT, DSF = 1440, 1000, 2
PAGES = [
    ("00-index", "index.html"),
    ("01-tasks", "tasks/index.html"),
    ("02-notes", "notes/index.html"),
    ("03-habits", "habits/index.html"),
    ("04-focus", "focus/index.html"),
    ("05-library", "library/index.html"),
    ("06-expenses", "expenses/index.html"),
    ("07-journal", "journal/index.html"),
    ("08-flashcards", "flashcards/index.html"),
]

THEMES = {"light": "dawn", "dawn": "dawn", "noon": "noon", "dusk": "dusk", "dark": "night", "night": "night"}
args = sys.argv[1:]
theme = args.pop(0) if args and args[0] in THEMES else "dawn"
theme_attr = THEMES[theme]
only = args or None
root = pathlib.Path(os.environ.get("BROLLY_SHOTS_DIR", pathlib.Path(tempfile.gettempdir()) / "brolly-shots"))
out_dir = root / theme
out_dir.mkdir(parents=True, exist_ok=True)

CHROMIUM = os.environ.get("BROLLY_CHROMIUM") or shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
LAUNCH = {"executable_path": CHROMIUM} if CHROMIUM else {}

with sync_playwright() as p:
    browser = p.chromium.launch(**LAUNCH, args=["--force-color-profile=srgb", "--font-render-hinting=none"])
    ctx = browser.new_context(
        viewport={"width": WIDTH, "height": HEIGHT},
        device_scale_factor=DSF,
        color_scheme="dark" if theme_attr in ("dusk", "night") else "light",
    )
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
    for name, path in PAGES:
        if only and name not in only:
            continue
        page.goto(f"{BASE}/{path}", wait_until="networkidle")
        if theme_attr != "dawn":
            page.evaluate("t => document.documentElement.setAttribute('data-theme', t)", theme_attr)
            page.wait_for_timeout(200)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(900)
        stage = page.evaluate("() => Math.round(document.querySelector('.br-stage').getBoundingClientRect().height)")
        raw = out_dir / f"_raw-{name}.png"
        page.screenshot(path=str(raw), full_page=True)
        final = out_dir / f"{name}.png"
        img = Image.open(raw)
        crop_h = min(img.height, stage * DSF)
        img.crop((0, 0, img.width, crop_h)).save(final, optimize=True)
        raw.unlink()
        print(f"{name}: {img.width // DSF}x{crop_h // DSF} {final.stat().st_size // 1024}KB errors={len(errors)}")
        for error in errors:
            print("   ", error)
        errors.clear()
    browser.close()
