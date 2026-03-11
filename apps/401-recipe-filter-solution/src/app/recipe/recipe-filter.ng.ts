import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  createDefaultRecipeFilterCriteria,
  RecipeFilterCriteria,
} from './recipe-filter-criteria';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter',
  imports: [FormField, FormRoot, MatFormFieldModule, MatInput],
  template: `
    <form [formRoot]="filterForm">
      <mat-form-field>
        <mat-label>Keywords</mat-label>
        <input
          [formField]="filterForm.keywords"
          matInput
          placeholder="Keywords"
          type="text"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Max Ingredients</mat-label>
        <input
          [formField]="filterForm.maxIngredientCount"
          aria-label="Max Ingredients"
          placeholder="max ingredients"
          type="number"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Max Steps</mat-label>
        <input
          [formField]="filterForm.maxStepCount"
          aria-label="Max Steps"
          placeholder="Max Steps"
          type="number"
        />
      </mat-form-field>
    </form>
  `,
  styles: `
    :host {
      text-align: center;
    }
  `,
})
export class RecipeFilter {
  filter = model<RecipeFilterCriteria>(createDefaultRecipeFilterCriteria());

  filterForm = form(this.filter);
}
