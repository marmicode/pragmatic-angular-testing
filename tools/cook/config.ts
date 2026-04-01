import { type Config, type Exercise } from './core.ts';

const files = {
  isSignedInGuard: 'src/app/user/is-signed-in.guard.ts',
  mealPlanner: 'src/app/meal-planner/meal-planner.ts',
  mealRepository: 'src/app/meal-planner/meal-repository.ts',
  recipeFilter: 'src/app/recipe/recipe-filter.ng.ts',
  recipeFilterVitestTest: 'src/app/recipe/recipe-filter.vitest.spec.ts',
  recipeSearch: 'src/app/recipe/recipe-search.ng.ts',
  recipeSearchIntegrationTest:
    'src/app/recipe/recipe-search.integration.spec.ts',
  recipeSearchIsolatedTest: 'src/app/recipe/recipe-search.isolated.spec.ts',
};

const exercises: Exercise[] = [
  {
    id: '101-meal-planner',
    name: '101 - Meal Planner',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '102-meal-planner-reactive',
    name: '102 - Meal Planner Reactive',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '103-meal-planner-signal-based',
    name: '103 - Meal Planner Signal Based',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '201-meal-planner-indirect-output',
    name: '201 - Meal Planner Indirect Output',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '202-meal-planner-indirect-input',
    name: '202 - Meal Planner Indirect Input',
    implementationFiles: [files.mealPlanner],
  },
  {
    id: '203-meal-repository',
    name: '203 - Meal Repository',
    implementationFiles: [files.mealRepository],
  },
  {
    id: '204-meal-repository-contract',
    name: '204 - Meal Repository Contract',
  },
  {
    id: '205-meal-repository-coalescing',
    name: '205 - Meal Repository Coalescing',
    implementationFiles: [files.mealRepository],
  },
  {
    id: '301-recipe-search-isolated',
    name: '301 - Recipe Search Isolated',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '302-recipe-search-integration-test-bed',
    name: '302 - Recipe Search Integration (TestBed)',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '302-recipe-search-integration-testing-library',
    name: '302 - Recipe Search Integration (Testing Library)',
  },
  {
    id: '302-recipe-search-integration-browser-mode',
    name: '302 - Recipe Search Integration (Vitest Browser Mode)',
  },
  {
    id: '303-recipe-search-shallow-test-bed',
    name: '303 - Recipe Search Shallow (TestBed)',
  },
  {
    id: '303-recipe-search-shallow-testing-library',
    name: '303 - Recipe Search Shallow (Testing Library)',
  },
  {
    id: '303-recipe-search-shallow-browser-mode',
    name: '303 - Recipe Search Shallow (Vitest Browser Mode)',
  },
  {
    id: '304-recipe-search-async-pipe',
    name: '304 - Recipe Search Async Pipe',
    forceTdd: true,
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '305-recipe-search-signals',
    name: '305 - Recipe Search Signals',
    forceTdd: true,
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '401-recipe-filter',
    name: '401 - Recipe Filter',
    implementationFiles: [files.recipeFilter],
  },
  {
    id: '402-recipe-search-filter-interaction',
    name: '402 - Recipe Search & Filter Interaction',
    implementationFiles: [
      files.recipeSearch,
      /* This is a shallow test exercise but we want to highlight the challenge of maintaining isolated tests.
       * We want to keep the isolated test for reference without annoying the user with it. */
      files.recipeSearchIsolatedTest,
    ],
  },
  {
    id: '403-recipe-search-add-button',
    name: '403 - Recipe Search Add Button',
    implementationFiles: [files.recipeSearch],
  },
  {
    id: '404-recipe-filter-material',
    name: '404 - Recipe Filter Material',
    implementationFiles: [files.recipeFilter],
  },
  {
    id: '501-recipe-filter-debounce',
    name: '501 - Recipe Filter Debounce',
    implementationFiles: [
      files.recipeFilter,
      /* We want to focus on browser mode from now on,
       * but we will keep the Jest/Vitest emulated tests for reference for now. */
      files.recipeFilterVitestTest,
      /* This test breaks when we debounce the filter.
       * We want to keep it for reference without annoying the user with it. */
      files.recipeSearchIntegrationTest,
    ],
  },
  {
    id: '502-recipe-filter-debounce-integration',
    name: '502 - Recipe Filter Debounce Integration',
  },
  {
    id: '601-router-guard',
    name: '601 - Router Guard',
    implementationFiles: [files.isSignedInGuard],
  },
  {
    id: '801-recipe-preview-testronaut',
    name: '801 - Recipe Preview Playwright Component Testing',
  },
  {
    id: '802-recipe-filter-testronaut',
    name: '802 - Recipe Filter Playwright Component Testing',
  },
  {
    id: '803-recipe-search-testronaut',
    name: '803 - Recipe Search Playwright Component Testing',
  },
  {
    id: '804-playwright-visual-regression-testing',
    name: '804 - Playwright Visual Regression Testing',
  },
];

export const config: Config = {
  base: 'main',
  exercises,
};
