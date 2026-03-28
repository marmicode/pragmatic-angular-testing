import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from './shared/title.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-app',
  imports: [Title, RouterOutlet],
  template: ` <wm-title>👨🏻‍🍳 Welcome to Whiskmate 🥘</wm-title>
    <router-outlet />`,
})
export class App {}
