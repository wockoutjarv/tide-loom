from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':390,'height':844}, has_touch=True, is_mobile=True)
    page.goto(Path('index.html').resolve().as_uri())
    buttons = page.locator('#controls button')
    buttons.nth(0).tap()
    assert page.locator('#next').is_enabled()
    page.locator('#undo').tap()
    assert page.locator('#next').is_disabled()
    assert all(x=='0' for x in page.locator('#sea b').all_text_contents())
    buttons.nth(0).focus()
    page.keyboard.press('Enter')
    page.locator('#next').tap()
    assert page.locator('#status').inner_text()=='Loom 2 · 0 pulls'
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    buttons.nth(1).tap()
    partial = page.locator('#sea b').all_text_contents()
    assert page.locator('#next').is_disabled()
    buttons.nth(2).tap()
    page.locator('#undo').tap()
    assert page.locator('#sea b').all_text_contents() == partial
    page.locator('#undo').tap()
    for level in range(1, 26):
        code = level + 1
        for pedal in range(3):
            for _ in range(code % 3):
                buttons.nth(pedal).tap()
            code //= 3
        assert page.locator('#next').is_enabled()
        if level == 25:
            assert 'All 26 looms complete!' in page.locator('#status').inner_text()
        page.locator('#next').tap()
    assert page.locator('#status').inner_text() == 'Loom 1 · 0 pulls'
    browser.close()
print('Passed touch win, undo, keyboard win, advance and narrow viewport checks.')
