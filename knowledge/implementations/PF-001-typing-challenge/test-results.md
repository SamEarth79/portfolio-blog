# PF-001 test results

`node --experimental-strip-types --test tests/race.test.mts`: 5 pass, 0 fail (B01 to B05). Type check, lint and production build pass.

Manual browser checks (desktop 1280x800 and emulated 375x812): F01, F02, F03, F04, F05, F07, F08, F10, F12 (retry and home not clicked), F13 (no real keyboard).
Partly checked: F06 (paste only, not drop), F09 (30s end; not backgrounded), F11 (win and loss seen; tie not seen).
