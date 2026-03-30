import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { mealPlannerRouterHelper } from './meal-planner/meal-planner.router-helper';
import { recipeRouterHelper } from './recipe/recipe.router-helper';
import { Navbar } from './shared/title.ng';
import { SignInButton } from './user/sign-in-button.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-app',
  imports: [Navbar, RouterOutlet, SignInButton, RouterLink, RouterLinkActive],
  template: ` <wm-navbar title="👨🏻‍🍳 Welcome to Whiskmate 🥘">
      <div class="actions" data-slot="actions">
        @for (link of links; track link) {
          <a [routerLink]="link.route" routerLinkActive="active">{{
            link.label
          }}</a>
        }
        <wm-sign-in-button />
      </div>
    </wm-navbar>
    <router-outlet />`,
  styles: `
    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &.active {
        font-style: italic;
        font-weight: bold;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin: 0 1em;
    }
  `,
})
export class App {
  links = [
    {
      label: 'SEARCH',
      route: recipeRouterHelper.search(),
    },
    {
      label: 'MEAL PLAN',
      route: mealPlannerRouterHelper.mealPlan(),
    },
  ];
}
