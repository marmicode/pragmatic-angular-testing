import { TestBed } from '@angular/core/testing';
import { watch } from '@whiskmate/testing/watch';
import { whenAppStable } from '@whiskmate/testing/when-app-stable';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from './meal-planner';

describe(MealPlanner.name, () => {
  it('adds recipes', () => {
    const { mealPlanner, burger, salad } = createMealPlanner();

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(mealPlanner.recipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('does not allow recipe duplicates', () => {
    const { mealPlanner, burgerDuplicate } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(burgerDuplicate)).toBe(false);
  });

  it('throws error if recipe is already present', () => {
    const { mealPlanner, burgerDuplicate } = createMealPlannerWithBurger();

    expect(() => mealPlanner.addRecipe(burgerDuplicate)).toThrow(
      `Can't add recipe.`,
    );
  });

  it.todo('🚧 adds recipes to meal repository', async () => {
    throw new Error('🚧 Work in progress!');
  });

  it('notifies when recipes change', async () => {
    const { mealPlanner, burger, salad } = createMealPlanner();

    const recipes = watch(mealPlanner.recipes);

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    await whenAppStable();

    expect(recipes()).toMatchObject([{ name: 'Burger' }, { name: 'Salad' }]);
  });

  describe('canAddRecipe', () => {
    it('allows new recipes', () => {
      const { mealPlanner, salad } = createMealPlannerWithBurger();

      expect(mealPlanner.canAddRecipe(salad)).toBe(true);
    });

    it('notifies when recipes change', async () => {
      const { mealPlanner, salad } = createMealPlannerWithBurger();

      const canAddRecipe = watch(() => mealPlanner.canAddRecipe(salad));

      mealPlanner.addRecipe(salad);

      await whenAppStable();

      expect(canAddRecipe()).toBe(false);
    });
  });

  function createMealPlannerWithBurger() {
    const { mealPlanner, burger, ...utils } = createMealPlanner();

    mealPlanner.addRecipe(burger);

    return {
      mealPlanner,
      ...utils,
    };
  }

  function createMealPlanner() {
    return {
      burger: recipeMother.withBasicInfo('Burger').build(),
      burgerDuplicate: recipeMother.withBasicInfo('Burger').build(),
      salad: recipeMother.withBasicInfo('Salad').build(),
      mealPlanner: TestBed.inject(MealPlanner),
    };
  }
});
