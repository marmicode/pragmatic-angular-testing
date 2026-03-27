---
sidebar_label: 401. Recipe Filter
---

# Recipe Filter

## Setup

```sh
pnpm cook start 401-recipe-filter
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeFilter`

New component `RecipeFilter` should trigger `filterChange` output with a value of type `RecipeFilterCriteria`.

This will be later used by `RecipeSearch` to filter results based on user filtering.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-filter.browser.spec.ts`.

#### 3. Spy on `filterChange` output.

Create a spy `const filterChangeSpy = vi.fn();`, and use [outputBinding](https://angular.dev/api/core/outputBinding) to spy on the `filterChange` output (e.g. `outputBinding(outputName, spy)`).

#### 4. Fill the form inputs using the following `aria-label` attributes: `Keywords`, `Max Ingredients` and `Max Steps`.

#### 5. Check that `filterChange` have been called with the correct value.

```ts
expect(filterChangeSpy).toHaveBeenLastCalledWith({
  ...
} satisfies RecipeFilterCriteria);
```

#### 6. [optional] Checkout the implementation if you've opted for TDD option:.

```sh
pnpm cook checkout-impl
```
