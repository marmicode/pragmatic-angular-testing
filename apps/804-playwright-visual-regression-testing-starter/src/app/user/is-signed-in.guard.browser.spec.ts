import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideRouter,
  Router,
  withComponentInputBinding,
} from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { page } from 'vitest/browser';
import { recipeRouterHelper } from '../recipe/recipe.router-helper';
import { Auth } from './auth';
import { isSignedInGuard } from './is-signed-in.guard';

describe(isSignedInGuard.name, () => {
  it('allows access to the route if user is signed in', async () => {
    const { auth, getCurrentUrl, navigate } = setUp();

    auth.signIn();

    await navigate('/meal-plan');

    expect.soft(getCurrentUrl()).toBe('/meal-plan');
    await expect
      .element(page.getByRole('heading'))
      .toHaveTextContent('Meal Plan');
  });

  it('prevents navigation if user is is not signed in and has already navigated', async () => {
    const { getCurrentUrl, navigate } = setUp();

    await navigate('/landing');

    await navigate('/meal-plan');

    expect.soft(getCurrentUrl()).toBe('/landing');
    await expect
      .element(page.getByRole('heading'))
      .toHaveTextContent('Landing');
  });

  it('redirects to /search if user is is not signed in and first visit', async () => {
    const { getCurrentUrl, navigate } = setUp();

    await navigate('/meal-plan');

    expect.soft(getCurrentUrl()).toBe('/search');
    await expect.element(page.getByRole('heading')).toHaveTextContent('Search');
  });
});

function setUp() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter(
        [
          {
            path: 'landing',
            component: Dummy,
            data: { title: 'Landing' },
          },
          {
            path: recipeRouterHelper.SEARCH_PATH,
            component: Dummy,
            data: { title: 'Search' },
          },
          {
            path: 'meal-plan',
            component: Dummy,
            data: { title: 'Meal Plan' },
            canActivate: [isSignedInGuard],
          },
        ],
        withComponentInputBinding(),
      ),
    ],
  });

  let harness: RouterTestingHarness;

  return {
    auth: TestBed.inject(Auth),
    getCurrentUrl: () => TestBed.inject(Router).url,
    navigate: async (
      url:
        | '/landing'
        | `/${typeof recipeRouterHelper.SEARCH_PATH}`
        | '/meal-plan',
    ) => {
      if (!harness) {
        harness = await RouterTestingHarness.create(url);
      } else {
        await harness.navigateByUrl(url);
      }
    },
  };
}

@Component({
  template: `<h1>{{ title() }}</h1>`,
})
export class Dummy {
  title = input.required<string>();
}
