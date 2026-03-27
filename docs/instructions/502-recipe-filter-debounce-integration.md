---
sidebar_label: 502. Recipe Filter Debounce Integration
---

# Recipe Filter Debounce Integration

## Setup

```sh
pnpm cook start 502-recipe-filter-debounce-integration
```

## 🎯 Goal: Handle debounce in integration tests using `setTimerTickMode`

In the previous exercise, we saw that:

- `recipe-search.browser.spec.ts` did not need any changes thanks to **polling** (i.e. `expect.element`),
- `recipe-search.integration.spec.ts` needed `waitFor` from Testing Library to add polling.

While polling makes the tests **pass**, they are **slow** because they wait for the real debounce timeout.

We will use `vi.useFakeTimers()` with `setTimerTickMode('nextTimerAsync')` to **automatically tick timers** during async operations, making the tests **fast** without needing manual timer control.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.browser.spec.ts`.

#### 3. Set up fake timers with `setTimerTickMode` in `mountRecipeSearch`.

Enable fake timers with `nextTimerAsync` mode before creating the component and restore them after each test:

```ts
vi.useFakeTimers().setTimerTickMode('nextTimerAsync');
onTestFinished(() => {
  vi.useRealTimers();
});
```

:::tip
`setTimerTickMode('nextTimerAsync')` automatically advances pending timers whenever an async operation is awaited. This eliminates the need for manual `vi.advanceTimersByTimeAsync(...)` calls.
:::

#### 4. Open `src/app/recipe/recipe-search.integration.vitest.spec.ts`.

#### 5. Apply the same fake timers setup in `mountRecipeSearch`.

```ts
vi.useFakeTimers().setTimerTickMode('nextTimerAsync');
onTestFinished(() => {
  vi.useRealTimers();
});
```

#### 6. Verify all tests pass.

```sh
pnpm test
```
