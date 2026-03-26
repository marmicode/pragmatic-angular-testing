import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { recipeMother } from '../testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('🚧 searches recipes without filtering', async () => {
    const { recipeHeadings } = await mountRecipeSearch();

    throw new Error('🚧 Work in progress!');
  });

  async function mountRecipeSearch() {
    TestBed.createComponent(RecipeSearch);

    return {
      // TODO: implement this
      recipeHeadings: null,
    };
  }
});
