---
sidebar_label: 601. Router Guard
---

# Router Guard

## Setup

```sh
pnpm cook start 601-router-guard
```

:::info ♻️ TDD option

You can choose to:

- go full-on TDD and implement the tests first then checkout the implementation later,
- or checkout the implementation first and then implement the tests.

:::

## 🎯 Goal #1: Allow access if user is signed in

The `isSignedInGuard` is a `CanActivateFn` route guard that controls access to protected routes.

**Implement a test** that verifies that a signed-in user can access the protected route.

### 📝 Steps

#### 1. Run tests:

```sh
pnpm test
```

#### 2. Open `src/app/user/is-signed-in.guard.browser.spec.ts`.

Note that `setUp()` function configures the router with three dummy routes: `/landing`, `/search`, and `/meal-plan`.

#### 3. Attach the guard to the route under test.

In `setUp()`, add `canActivate: [isSignedInGuard]` to the `meal-plan` route configuration.

#### 4. Sign in

Use the `Auth` service to sign in the user.

#### 4. Navigate between routes.

Create the harness using `RouterTestingHarness.create()` and navigate using `harness.navigateByUrl(url)`.

#### 5. Assert the current URL and heading.

Assert that the current URL is `/meal-plan` using `TestBed.inject(Router).url` and that the page displays the correct heading.

:::tip
Use `expect.soft()` for the URL check so both assertions run even if the first fails. Use `await expect.element(page.getByRole('heading'))` for the DOM assertion.
:::

#### 6. [optional] Checkout the implementation if you've opted for TDD option:

```sh
pnpm cook checkout-impl
```

## 🎯 Goal #2: Block navigation if user is not signed in

Same setup as [Goal #1](#-goal-1-allow-access-if-user-is-signed-in).

**Implement a test** that verifies that an unsigned user who has already navigated to another page is blocked from accessing the protected route.

### 📝 Steps

#### 1. Open `src/app/user/is-signed-in.guard.browser.spec.ts`.

Keep the guard on the `meal-plan` route from Goal #1.

#### 2. Navigate to a public route first.

Use the harness to go to `/landing` so the app has already navigated before the protected route is requested.

#### 3. Try to open the protected route.

Navigate to `/meal-plan`. The guard should cancel the navigation and leave you on the previous route.

#### 4. Assert URL and heading.

Assert the current URL is still `/landing` and the page shows the Landing heading (not Meal Plan).

## 🎯 Goal #3: Redirect to `/search` on first visit

Same setup as [Goal #1](#-goal-1-allow-access-if-user-is-signed-in).

**Implement a test** that verifies that an unsigned user visiting the protected route directly is redirected to `/search`.

### 📝 Steps

#### 1. Open `src/app/user/is-signed-in.guard.browser.spec.ts`.

Keep the guard on the `meal-plan` route.

#### 2. Navigate directly to the protected route.

Create the harness with an initial navigation to `/meal-plan`: `RouterTestingHarness.create(initialUrl)`.

#### 3. Assert redirect URL and heading.

Assert the current URL is `/search` and the page shows the Search heading.

## 📖 Appendices

### `expect.soft` vs `expect`

`expect.soft()` records a failure but does not stop the test. This is useful when you want to check multiple related assertions (e.g., URL **and** DOM content) and see all failures at once.

### `RouterTestingHarness`

- [Angular docs: RouterTestingHarness](https://angular.dev/api/router/testing/RouterTestingHarness)
