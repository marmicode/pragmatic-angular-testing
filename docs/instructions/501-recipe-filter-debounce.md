---
sidebar_label: 501. Recipe Filter Debounce
---

# Recipe Filter Debounce

## Setup

```sh
pnpm cook start 501-recipe-filter-debounce
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test debounce on `RecipeFilter`'s `keywords` field

The `RecipeFilter`'s `keywords` field should debounce user input before emitting the `filterChange` output.

We need to use **fake timers** to control time and verify that debounce works correctly.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-filter.browser.spec.ts`.

#### 3. Set up fake timers in `mountRecipeFilter`.

Enable fake timers before creating the component and restore them after each test:

```ts
vi.useFakeTimers();

onTestFinished(() => {
  vi.useRealTimers();
});
```

After creating the component, flush pending timers (e.g. Angular synchronization):

```ts
await vi.runAllTimersAsync();
```

#### 4. Implement the `it.todo('does not trigger filterChange output before debounce')` test.

1. Fill the `Keywords` input with a value.
2. Advance time by less than the debounce duration _(e.g. 290ms)_:

```ts
await vi.advanceTimersByTimeAsync(290);
```

3. Assert that `filterChangeSpy` has **not** been called.

#### 5. Update the existing `'triggers filterChange output'` test to work with debounce.

1. Rename it to `'triggers filterChange output after debounce'`.
2. Only fill the `Keywords` input _(skip `Max Ingredients` and `Max Steps`)_.
3. Advance time past the debounce duration _(e.g. 310ms)_.
4. Assert using `expect.objectContaining` since we are only checking the `keywords` field:

```ts
expect(filterChangeSpy).toHaveBeenLastCalledWith(
  expect.objectContaining({
    ...
  } satisfies Partial<RecipeFilterCriteria>),
);
```

#### 6. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```
