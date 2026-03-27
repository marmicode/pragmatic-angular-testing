---
sidebar_label: 403. Recipe Search Add Button
---

# Recipe Search Add Button

## Setup

```sh
pnpm cook start 403-recipe-search-add-button
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Clicking "ADD" adds the recipe to the meal planner

Each recipe preview contains an "ADD" button that adds the recipe to the `MealPlanner`.

When the user clicks the "ADD" button, the recipe should be added to the meal planner.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/recipe/recipe-search.browser.spec.ts`

#### 3. Add a new test: `it('adds recipe to meal planner', ...)`

#### 4. Query add buttons using `page.getByRole('button', { name: 'ADD' })`.

#### 5. Click the first add button using `.first().click()`.

#### 6. Assert that the meal planner contains the recipe.

You can get the meal planner recipe names using:

```ts
TestBed.inject(MealPlanner)
  .recipes()
  .map((recipe) => recipe.name);
```

Then assert using polling to keep the test resilient to async operations:

```ts
await expect.poll(() => getMealPlannerRecipeNames()).toEqual(['Burger']);
```

#### 7. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: The "ADD" button is disabled when the recipe can't be added

The "ADD" button should be **disabled** if the recipe can't be added to the meal planner _(e.g. it is already in the meal planner)_.

### 📝 Steps

#### 1. Open `src/app/recipe/recipe-search.browser.spec.ts`

#### 2. Add a new test: `it('disables add button if recipe can't be added', ...)`

#### 3. Add a recipe to the meal planner before querying the button.

You can add a recipe to the meal planner using:

```ts
await mealPlanner.addRecipe(recipe);
```

:::tip
Create a `mountRecipeSearchWithBurgerInMealPlanner` helper that reuses `mountRecipeSearch` and adds a burger to the meal planner.
:::

#### 4. Assert that the first "ADD" button is disabled.

```ts
await expect.element(addButtons.first()).toBeDisabled();
```
