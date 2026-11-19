#!/usr/bin/env python3
"""Exercise every example tool over HTTP: load clean, then use the thing."""
import functools
import os
import shutil
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
CHROMIUM = os.environ.get("BROLLY_CHROMIUM") or shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
LAUNCH = {"executable_path": CHROMIUM} if CHROMIUM else {}
IGNORE = ("AudioContext was not allowed to start", "navigator.vibrate", "autoplay")


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    handler = functools.partial(Quiet, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_port}/examples/"

    checks = []
    def check(name, ok, detail=""):
        checks.append((name, bool(ok), detail))
        print(("ok   " if ok else "FAIL ") + name + (f" — {detail}" if not ok and detail else ""))

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(**LAUNCH)
            page = browser.new_page(viewport={"width": 1280, "height": 900})
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on("console", lambda m: errors.append(m.text) if m.type == "error" and not any(s in m.text for s in IGNORE) else None)

            def load(name):
                errors.clear()
                page.goto(base + name)
                page.wait_for_timeout(500)
                fills = page.evaluate("document.querySelector('.br-stage').getBoundingClientRect().height >= innerHeight - 1")
                check(f"{name or 'index'}: stage fills viewport", fills)
                return [e for e in errors if not any(s in e for s in IGNORE)]

            # Index
            errs = load("")
            check("index: loads", not errs, str(errs[:2]))
            check("index: tool cards", page.locator(".ex-tool").count() >= 9, str(page.locator(".ex-tool").count()))
            check("index: links tools", page.locator('a.ex-tool[href$="index.html"]').count() >= 8)

            # Tasks
            errs = load("tasks/")
            check("tasks: loads", not errs, str(errs[:2]))
            check("tasks: rows", page.locator(".br-row").count() >= 5, str(page.locator(".br-row").count()))
            page.locator("#cmd").click(); page.wait_for_timeout(300)
            check("tasks: command bar", page.locator(".br-cmd").count() > 0)
            page.keyboard.press("Escape"); page.wait_for_timeout(400)
            page.locator("#add").click(); page.wait_for_timeout(300)
            check("tasks: add dialog", page.locator(".br-bloom").count() > 0)
            page.keyboard.press("Escape")

            # Notes
            errs = load("notes/")
            check("notes: loads", not errs, str(errs[:2]))
            start = page.locator(".ex-item").count()
            page.locator("#new").click(); page.wait_for_timeout(250)
            check("notes: creates", page.locator(".ex-item").count() == start + 1, f"{start} → {page.locator('.ex-item').count()}")
            page.fill("#title", "Persisted note")
            page.fill("#body", "This should survive a reload, and a mild sense of dread.")
            page.wait_for_timeout(800)
            page.reload(); page.wait_for_timeout(500)
            check("notes: autosave", page.input_value("#title") == "Persisted note")
            check("notes: body persists", "survive a reload" in page.input_value("#body"))

            # Habits
            errs = load("habits/")
            check("habits: loads", not errs, str(errs[:2]))
            cell = page.locator(".habit-cell:not([disabled])").first
            before = cell.get_attribute("aria-pressed")
            cell.click(); page.wait_for_timeout(300)
            check("habits: toggle", cell.get_attribute("aria-pressed") != before, f"{before} → {cell.get_attribute('aria-pressed')}")
            check("habits: progress", page.locator("#today-count").inner_text().count("/") == 1)

            # Focus
            errs = load("focus/")
            check("focus: loads", not errs, str(errs[:2]))
            page.locator("#start").click(); page.wait_for_timeout(1200)
            check("focus: starts", page.locator("#start").inner_text() == "Pause", page.locator("#start").inner_text())
            check("focus: ticks down", page.locator("#dial b").inner_text() != "25:00", page.locator("#dial b").inner_text())
            page.locator("#reset").click(); page.wait_for_timeout(150)
            check("focus: resets", page.locator("#start").inner_text() == "Start", page.locator("#start").inner_text())

            # Library
            errs = load("library/")
            check("library: loads", not errs, str(errs[:2]))
            start = page.locator(".lib-card").count()
            page.locator("#add").click(); page.wait_for_timeout(300)
            page.fill('[data-k="title"]', "Test link")
            page.fill('[data-k="url"]', "example.com/test")
            page.locator('#lib-save').click(); page.wait_for_timeout(1200)
            check("library: adds", page.locator(".lib-card").count() == start + 1, f"{start} → {page.locator('.lib-card').count()}")
            check("library: title", "Test link" in page.locator("body").inner_text())

            # Expenses
            errs = load("expenses/")
            check("expenses: loads", not errs, str(errs[:2]))
            before = page.locator("#month-total").inner_text()
            start = page.locator("#rows tr").count()
            page.fill("#desc", "Test expense")
            page.fill("#amount", "12.50")
            date_ok = page.evaluate('''(() => {
                const field = document.querySelector('#date .br-field').getBoundingClientRect();
                const resolved = document.querySelector('#date .br-date__resolved').getBoundingClientRect();
                const input = document.querySelector('#date input').getBoundingClientRect();
                return input.width > 200 && resolved.top >= field.bottom - 1;
            })()''')
            check("expenses: date field stacks", date_ok)
            page.locator("#add").click(); page.wait_for_timeout(500)
            check("expenses: adds", page.locator("#rows tr").count() == start + 1, f"{start} → {page.locator('#rows tr').count()}")
            check("expenses: total changes", page.locator("#month-total").inner_text() != before)

            # Journal
            errs = load("journal/")
            check("journal: loads", not errs, str(errs[:2]))
            page.fill("#text", "A test entry. Dry, but present.")
            page.wait_for_timeout(700)
            page.reload(); page.wait_for_timeout(500)
            check("journal: autosave", "test entry" in page.input_value("#text").lower())

            # Flashcards
            errs = load("flashcards/")
            check("flashcards: loads", not errs, str(errs[:2]))
            front = page.locator("#front").inner_text()
            check("flashcards: card", bool(front), front)
            page.locator("#card").click(); page.wait_for_timeout(250)
            check("flashcards: reveals", page.locator("#grade").is_visible())
            page.locator('[data-grade="good"]').click(); page.wait_for_timeout(300)
            check("flashcards: grades", page.locator("#reviewed").inner_text() == "1", page.locator("#reviewed").inner_text())
            check("flashcards: next card", page.locator("#front").inner_text() != front)

            # Theme survives a reload
            page.goto(base); page.wait_for_timeout(300)
            before = page.evaluate("document.documentElement.getAttribute('data-theme') || 'dawn'")
            page.locator("[data-ex-theme]").click(); page.wait_for_timeout(300)
            after = page.evaluate("document.documentElement.getAttribute('data-theme')")
            check("examples: theme", after != before, f"{before} → {after}")
            page.reload(); page.wait_for_timeout(300)
            check("examples: theme persists", page.evaluate("document.documentElement.getAttribute('data-theme')") == after)

            browser.close()
    finally:
        server.shutdown()

    failed = [c for c in checks if not c[1]]
    print(f"\n{len(checks) - len(failed)}/{len(checks)} passed")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
