# Agent Instructions

## Owner-wide practical-verification rule (8 November 2026)

**First step whenever development resumes in this repository:** inspect existing automated test cases, test-only scripts, fixtures, mocks, synthetic runners, Playwright/Cypress/e2e scaffolding and test-only CI commands. Remove confirmed obsolete, duplicated, AI-generated or otherwise unwanted test-only assets and orphaned dependencies/config before introducing new features. Preserve Git recoverability and report material removals. Do not delete working product/runtime code, authentication/security enforcement, data-integrity controls, required build/deploy machinery or anything whose purpose is uncertain; investigate such cases first. Keep this audit proportional so it does not displace the actual task.

**Do not create or regenerate test cases by default.** No new unit/integration/e2e suites, Playwright automation, mock harnesses, test frameworks, benchmark fixtures or CI testing jobs unless the owner explicitly asks. Do not run test suites merely to produce passing counts. This current owner instruction supersedes older generic test-generation/test-run mandates.

**Verify what is actually built:** run the real application/site/game/service locally where possible, exercise authorized browser/desktop/mobile/device flows, and inspect actual behavior, appearance, touch, audio and outcomes. Use existing minimal build/lint sanity checks only as useful; minimize GitHub Actions. Report observable evidence and blockers honestly. Automated pass counts are not practical verification or owner acceptance.

