---
sidebar_label: 205. Meal Repository Coalescing
---

# Meal Repository Coalescing

## Setup

```sh
pnpm cook start 205-meal-repository-coalescing
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test that `MealRepository` updates local storage after 300ms

When multiple meals are added in quick succession, `MealRepository` should **coalesce** the writes and **not** persist anything to `LocalStorage` before 300ms have elapsed since the last `addMeal` call.

After 300ms have elapsed since the first `addMeal` call, the coalesced meals should be persisted to `LocalStorage`.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/meal-planner/meal-repository.spec.ts`

#### 3. Activate the second `it.todo` test.

#### 4. Call `setUpFakeTimers()` to enable fake timers.

#### 5. Use `createMealRepository()` to get `mealRepo`, `burger`, `salad`, and `getParsedStorageValue`.

#### 4. Add `burger` using `mealRepo.addMeal(...)`.

#### 5. Advance timers by 100ms using `vi.advanceTimersByTimeAsync(100)`.

#### 6. Add `salad` using `mealRepo.addMeal(...)`.

#### 7. Advance timers by 210ms _(total: 310ms since the first `addMeal`)_.

#### 8. Assert that `getParsedStorageValue()` contains both meals.

#### 9. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: Test that `MealRepository` does not update local storage before 300ms

When multiple meals are added in quick succession, `MealRepository` should **coalesce** the writes and **not** persist anything to `LocalStorage` before 300ms have elapsed since the first `addMeal` call.

### 📝 Steps

#### 1. Activate the first `it.todo` test _(remove `.todo` and the `throw`)_.

#### 2. Call `setUpFakeTimers()` to enable fake timers. _(🔗 [Tip: Using fake timers](#-tip-using-fake-timers))_

#### 3. Use `createMealRepository()` to get `mealRepo`, `burger`, `salad`, and `getParsedStorageValue`.

#### 6. Add `burger`, advance by 100ms using `vi.advanceTimersByTimeAsync(100)`, then add `salad` _(same as Goal #1)_.

#### 7. Advance timers by 190ms _(total: 290ms since the first `addMeal`)_.

#### 8. Assert that `getParsedStorageValue()` is `null`. _(🔗 [Tip: Inspecting local storage](#-tip-inspecting-local-storage))_

## 📖 Appendices

### 🎁 Tip: Using fake timers

You can set up fake timers to control time in your tests using `vi.useFakeTimers()`. Then you can restore the real timers using `vi.useRealTimers()` after the test.

Use `setUpFakeTimers()` _(already provided in the spec)_ which does this for you. You can then use `vi.advanceTimersByTimeAsync(ms)` to simulate the passage of time:

```ts
setUpFakeTimers();

// ... perform actions ...

await vi.advanceTimersByTimeAsync(100);
```

### 🎁 Tip: Inspecting local storage

Use the `getParsedStorageValue()` helper _(returned by `createMealRepository()`)_ to read and parse the current value from `LocalStorage`:

```ts
const { mealRepo, getParsedStorageValue } = createMealRepository();

// Before coalescing delay elapses
expect(getParsedStorageValue()).toBeNull();
```
