import {
  ChangeDetectionStrategy,
  Component,
  signal,
  output,
  effect,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { RecipeFilterCriteria } from './recipe-filter-criteria';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="filterForm">
      <input
        [formField]="filterForm.keywords"
        aria-label="Keywords"
        placeholder="keywords"
        type="text"
      />
      <input
        [formField]="filterForm.maxIngredientCount"
        aria-label="Max Ingredients"
        formControlName="maxIngredientCount"
        placeholder="max ingredients"
        type="number"
      />
      <input
        [formField]="filterForm.maxStepCount"
        aria-label="Max Steps"
        placeholder="max steps"
        type="number"
      />
    </form>
  `,
  styles: `
    :host {
      text-align: center;
    }
  `,
})
export class RecipeFilter {
  filterChange = output<RecipeFilterCriteria>();

  filterForm = form(
    signal<{
      keywords: string;
      maxIngredientCount: number | null;
      maxStepCount: number | null;
    }>({
      keywords: '',
      maxIngredientCount: null,
      maxStepCount: null,
    }),
  );

  constructor() {
    effect(() => {
      const { keywords, maxIngredientCount, maxStepCount } =
        this.filterForm().value();
      this.filterChange.emit({
        keywords: keywords.length > 0 ? keywords : undefined,
        maxIngredientCount:
          maxIngredientCount != null ? maxIngredientCount : undefined,
        maxStepCount: maxStepCount != null ? maxStepCount : undefined,
      });
    });
  }
}
