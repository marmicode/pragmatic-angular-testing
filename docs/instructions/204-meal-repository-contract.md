---
sidebar_label: 204. Meal Repository Contract
---

# Meal Repository Contract

## Setup

```sh
pnpm cook start 204-meal-repository-contract
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Extract a contract to verify `MealRepositoryFake` behaves similarly to `MealRepository`

The `MealRepository` and `MealRepositoryFake` both implement `MealRepositoryDef`.
We want to make sure they both behave the same way by sharing the same tests via a **contract**.

**Refactor the tests** so that:

- Shared behavior tests _(adds recipes, returns empty array initially)_ are extracted into a reusable contract function.
- Both `MealRepository` and `MealRepositoryFake` are verified against that contract.
- Implementation-specific tests _(e.g. invalid storage)_ stay in `meal-repository.spec.ts`.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Create `src/app/meal-planner/meal-repository.contract.ts` with a `verifyMealRepositoryContract` function. _(🔗 [Tip: Contract function signature](#-tip-contract-function-signature))_

#### 3. Move the "adds recipes" and "returns empty array initially" tests from `meal-repository.spec.ts` into the contract function. Keep the "invalid storage" test in place.

#### 4. In `meal-repository.spec.ts`, replace the moved tests with a call to `verifyMealRepositoryContract(createMealRepository)`.

#### 5. Create `src/app/meal-planner/meal-repository.fake.spec.ts` that runs the contract against `MealRepositoryFake`. _(🔗 [Tip: Running the contract against the fake](#-tip-running-the-contract-against-the-fake))_

## 📖 Appendices

### 🎁 Tip: Contract function signature

The contract function accepts a factory and calls `it(...)` internally:

```ts
export const verifyMealRepositoryContract = (createMealRepository: () => { mealRepo: MealRepositoryDef }) => {
  it('adds recipes', async () => {
    /* ... */
  });

  it('returns empty array initially', async () => {
    /* ... */
  });
};
```

### 🎁 Tip: Running the contract against the fake

```ts
describe(MealRepositoryFake.name, () => {
  verifyMealRepositoryContract(createMealRepositoryFake);

  function createMealRepositoryFake() {
    TestBed.configureTestingModule({ providers: [provideMealRepositoryFake()] });
    return { mealRepo: TestBed.inject(MealRepositoryFake) };
  }
});
```

### 🎁 Tip: Contract vs. implementation-specific tests

- **Contract tests** verify behavior shared by all implementations of `MealRepositoryDef` _(e.g. adding and retrieving meals)_.
- **Implementation-specific tests** verify behavior unique to a single implementation _(e.g. handling invalid JSON in `LocalStorage` only applies to the real `MealRepository`)_.
