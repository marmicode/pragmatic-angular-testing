import { Routes } from '@angular/router';
import { mealPlannerRouterHelper } from './meal-planner/meal-planner.router-helper';
import { RecipeSearch } from './recipe/recipe-search.ng';
import { recipeRouterHelper } from './recipe/recipe.router-helper';
import { isSignedInGuard } from './user/is-signed-in.guard';

export const routes: Routes = [
  {
    path: recipeRouterHelper.SEARCH_PATH,
    component: RecipeSearch,
  },
  {
    path: mealPlannerRouterHelper.MEAL_PLAN_PATH,
    canActivate: [isSignedInGuard],
    loadComponent: () => import('./meal-planner/meal-plan.ng'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: recipeRouterHelper.SEARCH_PATH,
  },
];
