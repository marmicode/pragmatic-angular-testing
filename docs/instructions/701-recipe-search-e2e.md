---
sidebar_label: 701. E2E - Recipe Search
---

# E2E Testing with Playwright

## Setup

```sh
pnpm cook start 701-recipe-search-e2e
```

## 🎯 Goal: Write an E2E test that filters recipes by keywords

The application displays a catalog of recipes. Users can filter recipes by typing keywords in the **Keywords** input field.

**Write an E2E test** using [Playwright](https://playwright.dev/) that verifies the keyword filter works end-to-end: when the user types `bur` in the Keywords field, only the **Burger** recipe should remain visible.

### 📝 Steps

#### 1. Run the E2E test:

```sh
pnpm e2e
```

The test should be skipped initially.

#### 2. Open `e2e/recipe-search.spec.ts`.

#### 3. Remove `test.skip` and replace it with `test`. Remove the `throw` statement.

#### 4. Navigate to the application root using `page.goto()`.

🔗 [Playwright Navigation](https://playwright.dev/docs/writing-tests#navigation)

#### 5. Fill the **Keywords** field with `bur`.

Use `page.getByLabel()` to locate the input by its accessible label, then call `.fill()` to type into it.

🔗 [Locating by label](https://playwright.dev/docs/locators#locate-by-label)

#### 6. Assert that only the **Burger** recipe is displayed.

Use `page.getByRole('heading', { level: 2 })` to locate recipe names and `toHaveText()` to verify the displayed recipes.

🔗 [Locating by role](https://playwright.dev/docs/locators#locate-by-role)

## 📖 Appendices

### Playwright Locators

Playwright provides built-in locators that mirror accessible queries (by role, label, placeholder, text, etc.):

- [https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)

### Playwright Assertions

- [https://playwright.dev/docs/test-assertions](https://playwright.dev/docs/test-assertions)
