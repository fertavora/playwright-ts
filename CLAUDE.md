# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
yarn

# Run SauceDemo tests (runs Auth setup first, then specs)
yarn test:saucedemo

# Run a single test file
yarn playwright test tests/saucedemo/checkout.spec.ts --project='Sauce Demo'

# Run a single test by name
yarn playwright test --grep "Complete checkout" --project='Sauce Demo'

# Run BeSoccer tests
yarn playwright test --project='BeSoccer'

# Type-check and lint (runs automatically before tests via pretest)
tsc --noEmit && eslint tests/**

# Open HTML report
yarn playwright show-report
```

## Environment Variables

Copy `.env` or set these before running:
- `SAUCE_BASE_URL` — SauceDemo base URL (e.g. `https://saucedemo.com`)
- `SAUCE_USERNAME` / `SAUCE_USERNAME_ERROR` / `SAUCE_PASSWORD` — SauceDemo credentials

## Architecture

### Page Object Model

All pages live in [pageobjects/saucedemo/](pageobjects/saucedemo/). Every page class extends `SauceDemoPage` (except `LoginPage`), which provides a shared `headerPage: HeaderPage` instance accessible via `page.headerPage`.

Navigation between pages is done by returning a new page object instance from action methods (e.g. `loginPage.validLogin()` returns `InventoryPage`, `cartPage.clickCheckout()` returns `CheckoutOnePage`). Pages expose their locators as class properties so tests can assert against them directly.

### Fixtures

[fixtures/saucedemo.fixture.ts](fixtures/saucedemo.fixture.ts) extends Playwright's `test` with all page objects pre-instantiated. Tests import `test` and `expect` from the fixture, not from `@playwright/test` directly.

### Auth State

The `Auth` project ([tests/saucedemo/auth.setup.ts](tests/saucedemo/auth.setup.ts)) runs first and saves storage state files to `playwright/.auth/`:
- `inventoryAuth.json` — standard user logged in (used as default for `Sauce Demo` project)
- `errorUserAuth.json` — error user logged in
- `cartWithItems.json` — standard user with 3 items in cart

Individual spec files can override auth state with `test.use({ storageState: '...' })` — see [checkout.spec.ts](tests/saucedemo/checkout.spec.ts) which uses `cartWithItems.json`.

### Projects

- **Auth** — setup-only project, matches `*.setup.ts`
- **Sauce Demo** — functional tests for [saucedemo.com](https://saucedemo.com), depends on `Auth`
- **BeSoccer** — web scraping / data extraction tests (no auth, no page objects)

### Types

Shared TypeScript types live in [types/](types/) (e.g. `CheckoutData`).

### CI

GitHub Actions runs on PRs to `main`. The `SAUCE_BASE_URL`, `SAUCE_USERNAME`, and `SAUCE_PASSWORD` variables must be set in the repository's GitHub Actions vars.
