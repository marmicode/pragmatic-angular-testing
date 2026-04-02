import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { Auth } from './auth';
import { CurrentUser } from './current-user';
import { SignInButton } from './sign-in-button.ng';

describe(SignInButton, () => {
  it('shows "Sign In" when user is not signed in', async () => {
    setUp();

    await expect.element(page.getByRole('button')).toHaveTextContent('Sign In');
  });

  it('shows "Sign Out" when user is signed in', async () => {
    const { auth } = setUp();

    auth.signIn();

    await expect
      .element(page.getByRole('button'))
      .toHaveTextContent('Sign Out');
  });

  it('signs in when clicking "Sign In"', async () => {
    const { isSignedIn } = setUp();

    await page.getByRole('button', { name: 'Sign In' }).click();

    expect(isSignedIn()).toBe(true);
  });

  it('signs out when clicking "Sign Out"', async () => {
    const { auth, isSignedIn } = setUp();

    auth.signIn();

    await page.getByRole('button', { name: 'Sign Out' }).click();

    expect(isSignedIn()).toBe(false);
  });
});

function setUp() {
  TestBed.createComponent(SignInButton);

  return {
    auth: TestBed.inject(Auth),
    isSignedIn: () => TestBed.inject(CurrentUser).isSignedIn(),
  };
}
