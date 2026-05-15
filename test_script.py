from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(record_video_dir="videos/")
    page = context.new_page()

    page.goto("http://localhost:8000/pages/006-neovim-lazyvim-lab/")

    # Take initial screenshot
    page.screenshot(path="initial.png")

    # Click first accordion
    accordion = page.locator(".accordion").first
    accordion.click()

    # Wait for the panel to show
    page.wait_for_selector(".panel.show")

    # Take screenshot after clicking accordion
    page.screenshot(path="accordion_open.png")

    # Scroll to the quiz
    quiz = page.locator("#quiz-container")
    quiz.scroll_into_view_if_needed()

    # Click an option
    option = page.locator(".option-btn").nth(1)
    option.click()

    # Check that feedback is shown
    page.wait_for_selector(".feedback.show")

    # Ensure feedback gets focus
    is_focused = page.evaluate("document.activeElement === document.getElementById('quiz-feedback')")
    print(f"Feedback focused: {is_focused}")

    # Take screenshot of the quiz
    page.screenshot(path="quiz_answered.png")

    context.close()
    browser.close()
