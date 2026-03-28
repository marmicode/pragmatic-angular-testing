import { inject, Injectable } from '@angular/core';
import { CurrentUser } from './current-user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _currentUser = inject(CurrentUser);

  signIn() {
    this._currentUser.setUserInfo({ id: 'usr_foo', name: 'Foo Bar' });
  }

  signOut() {
    this._currentUser.setUserInfo(null);
  }
}
