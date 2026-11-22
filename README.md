# Tide Loom

Open index.html with loom.js alongside it in the same directory. The playable build is the static HTML and JavaScript included here. No install or network connection is required. Each pedal lists the three floats it raises. The flag above a float marks its target. A float cycles from 2 to 0. Use Undo to take back a move.

Run the logic tests with Node using node --test test.js. Regenerate coverage with node --experimental-test-coverage --test test.js. For the phone-sized browser test, use Python with Playwright and Chromium at /usr/bin/chromium, then run python browser_test.py from this directory.

Codex implemented the game and a separate Codex agent reviewed the implementation. See PRD.md, PLAN.md, QA.md and coverage.txt. Progress and undo history resume in the same browser when local storage is available. Floats are numbered from left to right. Puzzles are ordered by minimum pulls. Real-device rendering and screen-reader operation remain unverified.
