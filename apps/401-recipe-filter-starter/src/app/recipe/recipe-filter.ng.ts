import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { RecipeFilterCriteria } from './recipe-filter-criteria';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [FormField, FormRoot],
  template: ` &lt;🚧 wm-recipe-filter&gt; `,
})
export class RecipeFilter {
  filterChange = output<RecipeFilterCriteria>();
}
