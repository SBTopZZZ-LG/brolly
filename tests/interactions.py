#!/usr/bin/env python3
"""Exercise the behaviours that make the kit a kit, not a stylesheet."""
import os
import shutil
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
CHROMIUM = os.environ.get("BROLLY_CHROMIUM") or shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
LAUNCH = {"executable_path": CHROMIUM} if CHROMIUM else {}
PREVIEWS = ROOT / "docs" / "previews"


def load(page, name):
    page.goto("file://" + str(PREVIEWS / f"{name}.html"))
    page.wait_for_timeout(250)


def main():
    checks = []

    def check(name, ok, detail=""):
        checks.append((name, bool(ok), detail))
        print(("ok   " if ok else "FAIL ") + name + (f" — {detail}" if detail and not ok else ""))

    with sync_playwright() as p:
        browser = p.chromium.launch(**LAUNCH)
        page = browser.new_page(viewport={"width": 1100, "height": 800})

        # Tabs
        load(page, "Tabs")
        page.locator(".br-tabs__tab", has_text="This week").click()
        check("tabs switch", "Showing:" in page.locator("#o").inner_text())
        check("tabs aria", page.locator(".br-tabs__tab", has_text="This week").get_attribute("aria-selected") == "true")

        # Command bar
        load(page, "CommandBar")
        page.locator("#go").click()
        page.wait_for_timeout(200)
        check("command bar opens", page.locator(".br-cmd").count() > 0 and page.locator(".br-cmd").is_visible())
        page.keyboard.type("new")
        page.wait_for_timeout(200)
        check("command bar filters", page.locator(".br-cmd__item").count() >= 1)
        page.keyboard.press("Escape")
        page.wait_for_timeout(500)
        check("command bar closes", page.locator(".br-cmd").is_visible() is False if page.locator(".br-cmd").count() else True)

        # Bloom
        load(page, "Bloom")
        page.locator("#d").click()
        page.wait_for_timeout(250)
        check("bloom dialog opens", page.locator(".br-bloom").count() > 0)
        page.keyboard.press("Escape")
        page.wait_for_timeout(600)
        check("bloom closes", page.locator(".br-bloom:visible").count() == 0)
        page.locator("#m").click()
        page.wait_for_timeout(500)
        check("bloom menu opens", page.locator(".br-bloom--menu .br-menu__item").count() > 0)
        page.keyboard.press("Escape")
        page.wait_for_timeout(100)

        # Island
        load(page, "Island")
        page.locator("[data-t=saved]").click()
        page.wait_for_timeout(300)
        check("island toast", page.locator(".br-island").count() > 0)
        check("toast copy", "Saved." in page.locator("body").inner_text())

        # Hold to confirm
        load(page, "HoldButton")
        hold = page.locator(".br-hold").first
        box = hold.bounding_box()
        page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
        page.mouse.down()
        page.wait_for_timeout(1100)
        page.mouse.up()
        page.wait_for_timeout(300)
        check("hold confirms", page.locator(".br-island").count() > 0 and "Gone." in page.locator("body").inner_text())

        # Showcase: app behaviours
        load(page, "Showcase")
        rows = page.locator(".br-row").count()
        check("showcase rows", rows >= 5, f"{rows} rows")
        if rows:
            page.locator(".br-check__box").first.click()
            check("row toggles done", page.locator('.br-row[data-done="true"]').count() >= 1)
        page.locator("#cmd").click()
        page.wait_for_timeout(250)
        check("showcase command bar", page.locator(".br-cmd").count() > 0)
        page.keyboard.press("Escape")
        page.wait_for_timeout(150)
        page.locator("#add").click()
        page.wait_for_timeout(250)
        check("showcase bloom", page.locator(".br-bloom").count() > 0)
        page.keyboard.press("Escape")

        # Gallery theme + filter
        page.goto("file://" + str(ROOT / "docs" / "index.html"))
        page.wait_for_timeout(600)
        cards = page.locator(".card").count()
        check("gallery cards", cards >= 30, str(cards))
        page.locator('[data-set-theme="night"]').click()
        page.wait_for_timeout(400)
        src = page.locator(".card iframe").first.get_attribute("src")
        check("gallery theme propagates", "theme=night" in (src or ""), src or "")
        page.locator('[data-filter="Actions"]').click()
        visible = page.locator(".card:visible").count()
        check("gallery filter", 0 < visible < cards, f"{visible}/{cards}")

        browser.close()

    failed = [c for c in checks if not c[1]]
    print(f"\n{len(checks) - len(failed)}/{len(checks)} passed")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
