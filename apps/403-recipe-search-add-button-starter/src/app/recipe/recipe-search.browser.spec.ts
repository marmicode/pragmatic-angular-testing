import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
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

  it.todo('🚧 adds recipe to meal planner', async () => {
    throw new Error('🚧 Work in progress!');
  });

  it.todo("🚧 disables add button if recipe can't be added", async () => {
    throw new Error('🚧 Work in progress!');
  });

  async function mountRecipeSearch() {
    TestBed.configureTestingModule({
      providers: [provideMealRepositoryFake(), provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.createComponent(RecipeSearch);

    return {
      recipeHeadings: page.getByRole('heading'),
      updateFilter: ({ keywords }: { keywords: string }) =>
        page.getByLabelText('Keywords').fill(keywords),
    };
  }
});
