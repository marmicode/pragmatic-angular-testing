import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import {
  createDefaultRecipeFilterCriteria,
  RecipeFilterCriteria,
} from './recipe-filter-criteria';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [FormField, FormRoot],
  template: ` &lt;🚧 wm-recipe-filter&gt; `,
})
export class RecipeFilter {
  filter = model<RecipeFilterCriteria>(createDefaultRecipeFilterCriteria());
}
