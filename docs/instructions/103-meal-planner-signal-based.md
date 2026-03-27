---
sidebar_label: 103. Meal Planner Signal-Based
---

# Meal Planner Signal-Based

## Setup

```sh
pnpm cook start 103-meal-planner-signal-based
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test `MealPlanner.recipes` signal

It's time to get reactive with signals!

To notify Angular that the recipes have changed, we have to use a signal

```ts
class MealPlanner {
  recipes: Signal<Recipe[]>;
}
```

**Implement tests** for `recipes` and make sure that:

1. it notifies when new recipes are added.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/meal-planner/meal-planner.spec.ts`.

#### 3. Update existing tests to use `mealPlanner.recipes()` instead of `mealPlanner.getRecipes()`.

#### 4. Implement the `🚧 notifies when recipes change` test using the `watch` utility. _(Cf. [Tip: Watching signals](#-tip-watching-signals))_

## 🎯 Goal #2: Test that `canAddRecipe` is reactive

Unlike the RxJS approach _(exercise 102)_ where we needed a separate `watchCanAddRecipe()` method returning an `Observable<boolean>`, signals make `canAddRecipe` reactive for free — as long as it reads from a signal internally.

**Implement tests** to verify that `canAddRecipe` reacts to changes:

1. it notifies when recipes change.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/meal-planner/meal-planner.spec.ts`.

#### 3. Implement the `🚧 notifies when recipes change` test inside the `canAddRecipe` describe block using the `watch` utility. _(Cf. [Tip: Watching signals](#-tip-watching-signals))_

#### 4. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

## 📖 Appendices

### 🎁 Tip: Watching signals

The `watch` utility from `@whiskmate/testing/watch` creates a `computed` signal under the hood. It is useful for testing that a function is reactive.

#### Watching a signal directly

```ts
import { watch } from '@whiskmate/testing/watch';

test('counter is reactive', () => {
  const counter = new Counter();

  const watchedCount = watch(() => counter.count());

  counter.increment();

  // Count could be a non-reactive method like `getCount()`.
  // Using `watch` guarantees that `count` is reactive.
  expect(watchedCount()).toBe(1);
});

class Counter {
  private _count = signal(0);
  count = this._count.asReadonly();

  increment() {
    this._count.update((count) => count + 1);
  }
}
```
