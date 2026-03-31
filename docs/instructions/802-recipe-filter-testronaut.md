---
sidebar_label: 802. Testronaut - Recipe Filter
---

# Recipe Filter Playwright Component Testing with Testronaut

## Setup

```sh
pnpm cook start 802-recipe-filter-testronaut
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeFilter` using Playwright Component Testing

Check that `RecipeFilter` triggers the `filterChange` output with the right value when the user interacts with the form.

### 📝 Steps

#### 1. Run Playwright component tesets:

```sh
pnpm test-ui --ui
```

#### 2. Open `src/app/recipe/recipe-filter.pw.ts`.

#### 3. Fill the form by finding the inputs with their labels _(Keywords, Max Ingredients, Max Steps)_ then type using the `type()` command.

```ts
component.getByLabel('Keywords').fill('...');
```

#### 4. Spy on the `filterChange` output _(🔗 [🎁 Tip: Spying on component outputs](#-tip-spying-on-component-outputs))_ and check that it was called with the right filter object.

## 📖 Appendices

### 🎁 Tip: Spying on component outputs

```ts
let filter: RecipeFilter;
const component = mount({
  on: {
    filterChange(_filter) {
      filter = _filter;
    }
  }
})

// TODO: do something that triggers the output

expect(filter).toEqual(...);
```
