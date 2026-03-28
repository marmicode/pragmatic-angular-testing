import { Routes } from '@angular/router';
import { recipeRouterHelper } from './recipe/recipe.router-helper';
import { RecipeSearch } from './recipe/recipe-search.ng';
import { mealPlannerRouterHelper } from './meal-planner/meal-planner.router-helper';

export const routes: Routes = [
  {
    path: recipeRouterHelper.SEARCH_PATH,
    component: RecipeSearch,
  },
  {
    path: mealPlannerRouterHelper.MEAL_PLAN_PATH,
    loadComponent: () => import('./meal-planner/meal-plan.ng'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: recipeRouterHelper.SEARCH_PATH,
  },
];
