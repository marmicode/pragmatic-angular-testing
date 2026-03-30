import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { recipeRouterHelper } from '../recipe/recipe.router-helper';
import { CurrentUser } from './current-user';

export const isSignedInGuard: CanActivateFn = () => {
  const currentUser = inject(CurrentUser);
  const router = inject(Router);

  if (currentUser.isSignedIn()) {
    return true;
  } else if (!router.navigated) {
    return router.createUrlTree(recipeRouterHelper.search());
  } else {
    return false;
  }
};
