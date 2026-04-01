import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, BehaviorSubject, defer, Observable, of } from 'rxjs';
import { Recipe } from '../recipe/recipe';
import { LocalStorage } from '../shared/local-storage';

export interface MealRepositoryDef {
  addMeal(recipe: Recipe): Observable<void>;

  getMeals(): Observable<Recipe[]>;
}

@Injectable({
  providedIn: 'root',
})
export class MealRepository implements MealRepositoryDef {
  private _localStorage = inject(LocalStorage);
  private _meals$ = new BehaviorSubject<Recipe[]>(this._loadMeals());

  constructor() {
    this._meals$
      .pipe(auditTime(300), takeUntilDestroyed())
      .subscribe((meals) => this._updateMeals(meals));
  }

  addMeal(meal: Recipe): Observable<void> {
    return defer(() => {
      this._meals$.next([...this._meals$.value, meal]);
      return of(undefined);
    });
  }

  getMeals(): Observable<Recipe[]> {
    return defer(() => of(this._meals$.value));
  }

  private _loadMeals(): Recipe[] {
    const rawValue = this._localStorage.getItem(LOCAL_STORAGE_KEY);

    if (rawValue == null) {
      return [];
    }

    try {
      return JSON.parse(rawValue);
    } catch {
      return [];
    }
  }

  private _updateMeals(meals: Recipe[]) {
    this._localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meals));
  }
}

const LOCAL_STORAGE_KEY = 'meals';
