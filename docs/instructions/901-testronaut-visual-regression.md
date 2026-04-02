---
sidebar_label: 901. Testronaut - Visual Regression
---

# Visual Regression Testing with Testronaut

## Setup

```sh
pnpm cook start 901-testronaut-visual-regression
```

## 🎯 Goal #1: Add a visual regression screenshot to `RecipePreview`

`RecipePreview` already has a test that checks the recipe name is shown. Let's add a visual regression screenshot to catch unexpected layout or style changes.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm testronaut --ui
```

#### 2. Open `src/app/recipe/recipe-preview.pw.ts`

#### 3. Use `expect.soft` for existing assertions.

`expect.soft` allows subsequent assertions to run even if a previous one fails. This way, both the DOM assertion and the screenshot assertion will always execute. e.g.:

```ts
await expect.soft(page.getByRole('heading')).toHaveText('Burger');
```

#### 4. Add a visual regression assertion using `toHaveScreenshot()`.

```ts
await expect.soft(page).toHaveScreenshot();
```

#### 5. Run the tests.

The first run will **fail** and generate baseline screenshot(s) in a `*-snapshots/` folder next to the test file. Run the tests **again** — they should now pass.

## 🎯 Goal #2: Add a visual regression screenshot to `RecipeSearch` with masking

`RecipeSearch` displays recipe images that may vary across environments. We can **mask** dynamic regions so the screenshot only asserts the stable parts of the layout.

### 📝 Steps

#### 1. Open `src/app/recipe/recipe-search.pw.ts`

#### 2. In the `shows recipes` test, add a screenshot assertion with the `mask` option to hide all images.

```ts
await expect.soft(page).toHaveScreenshot({
  mask: [page.getByRole('img')],
});
```

The `mask` option replaces the matched elements with a solid-color box in the screenshot, preventing flakiness caused by non-deterministic images.

#### 3. Run the tests twice: once to generate baselines, once to verify they pass.

## 📖 Appendices

### Playwright Visual Comparisons

- [https://playwright.dev/docs/test-snapshots](https://playwright.dev/docs/test-snapshots)

### `expect.soft`

- [https://playwright.dev/docs/test-assertions#soft-assertions](https://playwright.dev/docs/test-assertions#soft-assertions)

### `maxDiffPixelRatio`

The Playwright config (`playwright-testronaut.config.ts`) already sets `maxDiffPixelRatio: 0.01`, allowing up to 1% pixel difference to accommodate minor rendering variations across environments.
