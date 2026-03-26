import { TestBed } from '@angular/core/testing';
import { watch } from '@whiskmate/testing/watch';
import { whenAppStable } from '@whiskmate/testing/when-app-stable';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from './meal-planner';

describe(MealPlanner.name, () => {
  it('adds recipes', async () => {
    const { mealPlanner, burger, salad } = createMealPlanner();

    await mealPlanner.addRecipe(burger);
    await mealPlanner.addRecipe(salad);

    expect(mealPlanner.recipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('does not allow recipe duplicates', async () => {
    const { mealPlanner, burgerDuplicate } =
      await createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(burgerDuplicate)).toBe(false);
  });

  it('throws error if recipe is already present', async () => {
    const { mealPlanner, burgerDuplicate } =
      await createMealPlannerWithBurger();

    await expect(mealPlanner.addRecipe(burgerDuplicate)).rejects.toThrow(
      `Can't add recipe.`,
    );
  });

  it.todo('🚧 adds recipes to meal repository', async () => {
    throw new Error('🚧 Work in progress!');
  });

  it('notifies when recipes change', async () => {
    const { mealPlanner, burger, salad } = await createMealPlanner();

    const recipes = watch(mealPlanner.recipes);

    await mealPlanner.addRecipe(burger);
    await mealPlanner.addRecipe(salad);

    await whenAppStable();

    expect(recipes()).toMatchObject([{ name: 'Burger' }, { name: 'Salad' }]);
  });

  describe('canAddRecipe', () => {
    it('allows new recipes', async () => {
      const { mealPlanner, salad } = await createMealPlannerWithBurger();

      expect(mealPlanner.canAddRecipe(salad)).toBe(true);
    });

    it('notifies when recipes change', async () => {
      const { mealPlanner, salad } = await createMealPlannerWithBurger();

      const canAddRecipe = watch(() => mealPlanner.canAddRecipe(salad));

      await mealPlanner.addRecipe(salad);

      await whenAppStable();

      expect(canAddRecipe()).toBe(false);
    });
  });

  async function createMealPlannerWithBurger() {
    const { mealPlanner, burger, ...utils } = createMealPlanner();

    await mealPlanner.addRecipe(burger);

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
