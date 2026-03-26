import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { MealPlanner } from '../meal-planner/meal-planner';
import { provideMealRepositoryFake } from '../meal-planner/meal-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { recipeHeadings } = await mountRecipeSearch();

    await expect.element(recipeHeadings).toHaveLength(2);
    await expect.element(recipeHeadings.nth(0)).toHaveTextContent('Burger');
    await expect.element(recipeHeadings.nth(1)).toHaveTextContent('Salad');
  });

  it('filters recipes by keywords', async () => {
    const { recipeHeadings, updateFilter } = await mountRecipeSearch();

    await updateFilter({
      keywords: 'Burg',
    });

    await expect.element(recipeHeadings).toHaveTextContent('Burger');
  });

  it('adds recipe to meal planner', async () => {
    const { getFirstAddButton, getMealPlannerRecipeNames } =
      await mountRecipeSearch();

    await getFirstAddButton().click();

    await expect.poll(() => getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("should disable add button if can't add", async () => {
    const { getFirstAddButton } =
      await mountRecipeSearchWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    await expect.element(getFirstAddButton()).toBeDisabled();
  });

  async function mountRecipeSearchWithBurgerInMealPlanner() {
    const { mealPlanner, ...utils } = await mountRecipeSearch();

    mealPlanner.addRecipe(recipeMother.withBasicInfo('Burger').build());

    return utils;
  }

  async function mountRecipeSearch() {
    TestBed.configureTestingModule({
      providers: [provideMealRepositoryFake(), provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    const mealPlanner = TestBed.inject(MealPlanner);

    return {
      mealPlanner,
      recipeHeadings: page.getByRole('heading'),
      getMealPlannerRecipeNames: () =>
        mealPlanner.recipes().map((recipe) => recipe.name),
      getFirstAddButton() {
        return page.getByRole('button', { name: 'ADD' }).first();
      },
      async updateFilter({ keywords }: { keywords: string }) {
        await page.getByLabelText('Keywords').fill(keywords);
      },
    };
  }
});
