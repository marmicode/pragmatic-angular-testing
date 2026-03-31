---
sidebar_label: 2. Testing Library
---

# Recipe Search Shallow with Testing Library

## Setup

```sh
pnpm cook start 303-recipe-search-shallow-testing-library
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal: Test `RecipeSearch`

`RecipeSearch` component should fetch recipes using `RecipeRepository` on startup and display them using `RecipePreview` component.
But, this time, let's check that the loaded recipes are forwarded as inputs to children.

**Implement tests** for `RecipeSearch` and make sure that:

- recipes are passed to child components.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.shallow.spec.ts`.

#### 3. Override component's imports & schema:

```ts
await render(RecipeSearch, {
  ...
  configureTestBed(testBed) {
    ...
    testBed.overrideComponent(RecipeSearch, {
      set: {
        imports: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });
    ...
  },
});
```

#### 4. Query DOM and check child components properties.

- 🔗 [Testing Library Queries docs](#-testing-library-queries-docs--or-how-to-choose-the-right-query)
- 🔗 [Access element properties](#-tip-access-element-properties)

:::tip
Note that `RecipePreview` component host element has a `data-testid="recipe-preview"` attribute that you can query with Testing Library.
:::

#### 5. [optional] Checkout the implementation if you've opted for TDD option:.

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 📖 Appendices

### 🔗 `@testing-library/angular`'s `render` docs

[https://testing-library.com/docs/angular-testing-library/api#render](https://testing-library.com/docs/angular-testing-library/api#render)

### 🔗 Testing Library Queries docs — or how to choose the right query

[https://testing-library.com/docs/queries/about](https://testing-library.com/docs/queries/about)

### 🎁 Tip: Access element properties

You can transform any `HTMLElement` into an Angular `DebugElement` to access the properties forwarded by parent component:

```ts
const element = screen.getBy...;

new DebugElement(element).properties.myInput;
```
