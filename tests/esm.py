#!/usr/bin/env python3
"""ES modules need HTTP; check the ESM build and example over a local server."""
import functools
import os
import shutil
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
CHROMIUM = os.environ.get("BROLLY_CHROMIUM") or shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
LAUNCH = {"executable_path": CHROMIUM} if CHROMIUM else {}


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    handler = functools.partial(Quiet, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    url = f"http://127.0.0.1:{server.server_port}/examples/esm/index.html"
    errors = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(**LAUNCH)
            page = browser.new_page()
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.goto(url)
            page.wait_for_timeout(500)
            ok = page.evaluate("window.__esm === true")
            text = page.locator("#out").inner_text()
            page.locator("#go").click()
            page.wait_for_timeout(300)
            toast = page.locator(".br-island").count() > 0
            browser.close()
        print(f"{'ok  ' if ok else 'FAIL'} esm import")
        print(f"{'ok  ' if 'Imported' in text else 'FAIL'} esm render")
        print(f"{'ok  ' if toast else 'FAIL'} esm behaviour")
        print(f"{'ok  ' if not errors else 'FAIL'} esm console — {errors}")
        if not (ok and "Imported" in text and toast and not errors):
            raise SystemExit(1)
    finally:
        server.shutdown()


if __name__ == "__main__":
    main()
