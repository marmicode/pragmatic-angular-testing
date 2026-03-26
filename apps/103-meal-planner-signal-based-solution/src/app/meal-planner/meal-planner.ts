import { Injectable, signal, untracked } from '@angular/core';
import { Recipe } from '../recipe/recipe';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  private _recipes = signal<Recipe[]>([]);

  recipes = this._recipes.asReadonly();

  canAddRecipe(recipe: Recipe): boolean {
    return this.recipes().find((r) => recipe.id === r.id) == null;
  }

  addRecipe(recipe: Recipe) {
    if (!untracked(() => this.canAddRecipe(recipe))) {
      throw new Error(`Can't add recipe.`);
    }
    this._recipes.update((recipes) => [...recipes, recipe]);
  }
}
