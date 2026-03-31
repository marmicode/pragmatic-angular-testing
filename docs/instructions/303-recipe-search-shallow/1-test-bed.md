---
sidebar_label: 1. TestBed
---

# Recipe Search Shallow with `TestBed`

## Setup

```sh
pnpm cook start 303-recipe-search-shallow-test-bed
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

#### 4. Query DOM and check child components properties

- 🔗 [Query DOM with `fixture.debugElement`](#-tip-query-dom-with-fixturedebugelement)
- 🔗 [Access element properties](#-tip-access-element-properties)

#### 5. [optional] Checkout the implementation if you've opted for TDD option:.

```sh
pnpm cook checkout-impl
```

#### 6. ✅ Make sure tests are passing.

## 📖 Appendices

### 🎁 Tip: Query DOM with `fixture.debugElement`

You can query one or multiple elements using, respectively, `query` and `queryAll` methods.

```ts
const heading = fixture.debugElement.query(By.css('h2'));

const headings = fixture.debugElement.queryAll(By.css('h2'));
```

### 🎁 Tip: Access element properties

```ts
fixture.query(By.css('...')).properties.myInput;
```
