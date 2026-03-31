---
sidebar_label: 3. Vitest Browser Mode
---

# Recipe Search Shallow with Vitest Browser Mode

## Setup

```sh
pnpm cook start 303-recipe-search-shallow-browser-mode
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
TestBed.overrideComponent(RecipeSearch, {
  set: {
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});
```

#### 4. Query DOM and check child components properties.

- 🔗 [Query DOM with Vitest Browser Mode](#-tip-how-to-query-the-dom-and-make-assertions-with-vitest-browser-mode)
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

### 🎁 Tip: How to query the DOM and make assertions with Vitest Browser Mode

- ⚡️ Querying with Vitest Browser Mode: https://vitest.dev/guide/browser/locators.html
- ⚡️ Asserting with Vitest Browser Mode: https://vitest.dev/guide/browser/assertion-api.html

### 🎁 Tip: Access element properties

You can transform any `HTMLElement` into an Angular `DebugElement` to access the properties forwarded by parent component:

```ts
const elements = page.getByXXX().elements();

const myItems = elements.map((el) => new DebugElement(el).properties.myItem);
```
