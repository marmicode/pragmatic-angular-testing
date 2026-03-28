import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { getRecipeNames } = await mountRecipeSearch();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('searches recipes using given filter', async () => {
    const { getRecipeNames, updateFilter } = await mountRecipeSearch();

    await updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
      maxStepCount: null,
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  it.todo('🚧 adds recipe to meal planner', async () => {
    throw new Error('🚧 Work in progress!');
  });

  it.todo("🚧 disables add button if recipe can't be added", async () => {
    throw new Error('🚧 Work in progress!');
  });

  async function mountRecipeSearch() {
    const { debugElement, fixture } = await render(RecipeSearch, {
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed.overrideComponent(RecipeSearch, {
          set: {
            imports: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
          },
        });

        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });
    await fixture.whenStable();

    return {
      getRecipeNames: () =>
        debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name),
      updateFilter: async (filter: RecipeFilterCriteria) => {
        debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        await fixture.whenStable();
      },
    };
  }
});
