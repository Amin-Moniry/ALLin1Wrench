# REDLINE 03 — validation scope

## Automated checks
- 606 passing Chromium regression checks on both native-source and text-packaged delivery. The same suite run twice is not counted as 1,212 independent test cases.
- Desktop/mobile widths: 360, 390, 768, 1024, 1440, 2560 pixels. English and Persian; light and dark.
- All five case-study routes additionally checked at 390 and 1440 pixels in both languages.
- Covers overflow, direction, duplicate IDs, project filters, architecture tabs and keyboard movement, search result/empty/escape behavior, mobile navigation, FAQ, injection-safe local text preview, contact draft encoding, preference persistence, reduced motion, native image dialog, source links, and no-JavaScript fallback.
- 12 additional checks on the actual published root → redline/work → root routing layout, both languages, all local media decodes, and no request/JavaScript failures. See PUBLISHED-PATH-QA.json.
- Seven principal foreground/background pairs meet 4.5:1 AA normal-text contrast. See CONTRAST.json. This is not a full WCAG certification.

## Visual review
Desktop section views, five case-study hero/article layouts, English/Persian, light-mode samples, narrow Persian layouts, search, expanded FAQ and mobile menu were rendered and inspected. Capture-only sticky header artifacts were removed from long section captures; normal viewport header behavior remains tested.

## Fixed during QA
- Headline word wrapping.
- Missing Unicode decorative/copy glyphs replaced with ASCII or native SVG.
- Search-input Escape behavior and incorrect double-hash section links.
- Long DetectSafeVisionX title on narrow project cards.
- Lazy images explicitly loaded for visual captures rather than treating blank captures as finished images.

## Not certified
Safari/Firefox, physical-device frame rate, assistive-technology compatibility, full WCAG compliance, production Telegram service uptime, AI correctness, or server email delivery. Contact is explicitly a draft-only mailto flow.

## Run locally
Serve the portfolio with Python or another static server. Install Playwright in a development environment; set CHROMIUM_PATH if the browser is not /usr/local/bin/chromium. Then run:
```sh
BASE_URL=http://localhost:8080 QA_DIR=qa-output node tests/regression.cjs
```
