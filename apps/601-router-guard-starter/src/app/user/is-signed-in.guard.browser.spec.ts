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
  it.todo('🚧 allows access to the route if user is signed in');

  it.todo(
    '🚧 prevents navigation if user is is not signed in and has already navigated',
  );

  it.todo(
    '🚧 redirects to /search if user is is not signed in and first visit',
  );
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
          },
        ],
        withComponentInputBinding(),
      ),
    ],
  });

  return {
    auth: TestBed.inject(Auth),
  };
}

@Component({
  template: `<h1>{{ title() }}</h1>`,
})
export class Dummy {
  title = input.required<string>();
}
