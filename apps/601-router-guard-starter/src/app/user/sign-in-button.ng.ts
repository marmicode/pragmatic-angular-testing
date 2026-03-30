import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Auth } from './auth';
import { CurrentUser } from './current-user';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-sign-in-button',
  imports: [MatButton],
  template: `<button mat-flat-button (click)="toggleSignIn()">
    {{ label() }}
  </button>`,
})
export class SignInButton {
  auth = inject(Auth);
  currentUser = inject(CurrentUser);
  label = computed(() =>
    this.currentUser.isSignedIn() ? 'Sign Out' : 'Sign In',
  );

  toggleSignIn() {
    if (this.currentUser.isSignedIn()) {
      this.auth.signOut();
    } else {
      this.auth.signIn();
    }
  }
}
