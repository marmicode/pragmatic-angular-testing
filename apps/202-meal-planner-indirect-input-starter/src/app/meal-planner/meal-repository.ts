import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe/recipe';

export interface MealRepositoryDef {
  addMeal(recipe: Recipe): Observable<void>;

  getMeals(): Observable<Recipe[]>;
}

@Service()
export class MealRepository implements MealRepositoryDef {
  addMeal(meal: Recipe): Observable<void> {
    throw new Error('🚧 work in progress!');
  }

  getMeals(): Observable<Recipe[]> {
    throw new Error('🚧 work in progress!');
  }
}
