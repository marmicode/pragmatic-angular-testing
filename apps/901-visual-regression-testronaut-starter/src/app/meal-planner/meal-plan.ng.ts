import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MealPlanner } from './meal-planner';
import { Catalog } from '../shared/catalog.ng';
import { RecipePreview } from '../recipe/recipe-preview.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-meal-plan',
  imports: [Catalog, RecipePreview],
  template: `
    <wm-catalog>
      @for (recipe of recipes(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      }
    </wm-catalog>
  `,
})
export class MealPlan {
  recipes = inject(MealPlanner).recipes;
}

export default MealPlan;
