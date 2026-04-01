---
sidebar_label: 203. Meal Repository
---

# Meal Repository

## Setup

```sh
pnpm cook start 203-meal-repository
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Test that `MealRepository` returns the added meals

When a meal is added to the `MealRepository`, it should be returned by `getMeals()`.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/meal-planner/meal-repository.spec.ts`

#### 3. Activate the first `it.todo` test _(remove `.todo` and the `throw`)_.

#### 4. Use `createMealRepository()` to get `mealRepo`, `burger`, and `salad`.

#### 5. Add both recipes using `mealRepo.addMeal(...)`. _(🔗 [Tip: Using `lastValueFrom`](#-tip-using-lastvaluefrom))_

#### 6. Assert that `getMeals()` returns both recipes.

#### 7. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: Test that `getMeals` returns an empty array when storage is empty

**Implement a test** that verifies `getMeals()` emits an empty array when no meals have been added.

### 📝 Steps

#### 1. Activate the second `it.todo` test.

#### 2. Get meals from a fresh repository _(no recipes added)_.

#### 3. Assert it returns an empty array.

## 🎯 Goal #3: Test that `getMeals` handles invalid storage gracefully

**Implement a test** that verifies `getMeals()` emits an empty array when `LocalStorage` contains invalid data.

### 📝 Steps

#### 1. Activate the third `it.todo` test.

#### 2. Implement the `setStorageValue` helper in `setUpMealRepository()`.

#### 3. Use `setUpMealRepository()` instead of `createMealRepository()` to control instantiation timing. _(🔗 [Tip: Deferred instantiation](#-tip-deferred-instantiation))_

#### 4. Set an invalid value in storage **before** calling `getMealRepo()`.

#### 5. Assert that `getMeals()` returns an empty array.

## 📖 Appendices

### 🎁 Tip: Using `lastValueFrom`

Since `addMeal` and `getMeals` return `Observable`, use `lastValueFrom` to convert them to `Promise` in tests:

```ts
import { lastValueFrom } from 'rxjs';

await lastValueFrom(mealRepo.addMeal(burger));
const meals = await lastValueFrom(mealRepo.getMeals());
```

### 🎁 Tip: Deferred instantiation

When you need to set up state **before** the service is constructed _(e.g. pre-populating `LocalStorage`)_, use `setUpMealRepository()` instead of `createMealRepository()` and call `getMealRepo()` **after** setting up the state:

```ts
const { getMealRepo, setStorageValue } = setUpMealRepository();

setStorageValue('...');

const mealRepo = getMealRepo();
```
