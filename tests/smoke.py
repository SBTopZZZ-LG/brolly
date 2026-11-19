#!/usr/bin/env python3
"""Load every generated preview and fail on script errors or missing assets."""
import glob
import os
import shutil
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
CHROMIUM = os.environ.get("BROLLY_CHROMIUM") or shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
LAUNCH = {"executable_path": CHROMIUM} if CHROMIUM else {}
IGNORE = ("AudioContext was not allowed to start", "navigator.vibrate", "autoplay")


def keep(msg):
    return not any(s in msg for s in IGNORE)


def main():
    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH)
        page = browser.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.on("console", lambda m: errors.append(f"console: {m.text}") if m.type == "error" and keep(m.text) else None)
        page.on("requestfailed", lambda r: errors.append(f"requestfailed: {r.url}"))

        previews = sorted(glob.glob(str(ROOT / "docs" / "previews" / "*.html")))
        for file in previews:
            errors.clear()
            name = Path(file).stem
            page.goto("file://" + file)
            page.wait_for_timeout(350)
            checks = {
                "pageerrors": [e for e in errors if keep(e)],
                "brolly": page.evaluate("typeof window.Brolly === 'object'"),
                "stage": name == "Cover" or page.locator(".br-stage").count() > 0,
                "content": page.evaluate("document.body.innerText.trim().length > 0"),
            }
            bad = [k for k, v in checks.items() if v is not True and v != []]
            if bad:
                failures.append((name, bad, checks))
                print(f"FAIL {name}: {bad}")
            else:
                print(f"ok   {name}")

        # Gallery: cards, real CSS, no missing assets
        errors.clear()
        page.goto("file://" + str(ROOT / "docs" / "index.html"))
        page.wait_for_timeout(1000)
        gallery = page.locator(".card").count()
        bg = page.evaluate("getComputedStyle(document.querySelector('.card')).backgroundColor")
        ink = page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()")
        missing = [e for e in errors if keep(e)]
        print(f"gallery cards: {gallery}")
        if gallery < 30:
            failures.append(("gallery", ["cards"], gallery))
        if bg in ("rgba(0, 0, 0, 0)", "transparent") or not ink:
            failures.append(("gallery", ["stylesheet"], {"bg": bg, "ink": ink}))
        if missing:
            failures.append(("gallery", ["assets"], missing[:3]))
        browser.close()

    if failures:
        print("\nFAILURES")
        for f in failures:
            print(f)
        sys.exit(1)
    print(f"\n{len(previews)} previews loaded clean")


if __name__ == "__main__":
    main()
