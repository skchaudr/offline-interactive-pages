from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{os.path.abspath('pages/006-neovim-lazyvim-lab/index.html')}")

    # Expand first accordion
    page.click('.accordion')
    page.wait_for_timeout(500)

    # Answer first quiz question
    page.click('.option-btn[data-correct="true"]')
    page.wait_for_timeout(500)

    page.screenshot(path="screenshot.png", full_page=True)
    browser.close()
