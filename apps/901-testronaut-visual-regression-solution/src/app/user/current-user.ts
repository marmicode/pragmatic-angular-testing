import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUser {
  private _userInfo = signal<UserInfo | null>(null);

  isSignedIn = computed(() => this._userInfo() !== null);
  userInfo = this._userInfo.asReadonly();

  setUserInfo(userInfo: UserInfo | null) {
    this._userInfo.set(userInfo);
  }
}

export interface UserInfo {
  id: string;
  name: string;
}
