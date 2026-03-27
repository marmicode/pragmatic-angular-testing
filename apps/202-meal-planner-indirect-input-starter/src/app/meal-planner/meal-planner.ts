import { inject, Injectable, signal, untracked } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Recipe } from '../recipe/recipe';
import { MealRepository } from './meal-repository';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  private _recipes = signal<Recipe[]>([]);
  recipes = this._recipes.asReadonly();

  private _mealRepository = inject(MealRepository);

  canAddRecipe(recipe: Recipe): boolean {
    return this.recipes().find((r) => recipe.id === r.id) == null;
  }

  async addRecipe(recipe: Recipe) {
    if (!untracked(() => this.canAddRecipe(recipe))) {
      throw new Error(`Can't add recipe.`);
    }

    await lastValueFrom(this._mealRepository.addMeal(recipe));

    this._recipes.update((recipes) => [...recipes, recipe]);
  }
}
