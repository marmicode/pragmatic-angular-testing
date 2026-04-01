import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { LocalStorage } from '../shared/local-storage';
import { provideLocalStorageFake } from '../shared/local-storage.fake';
import { recipeMother } from '../testing/recipe.mother';
import { MealRepository } from './meal-repository';
import { verifyMealRepositoryContract } from './meal-repository.contract';

describe(MealRepository.name, () => {
  verifyMealRepositoryContract(createMealRepository);

  it('coalesces multiple addMeal calls and does not update the local storage before 300ms', async () => {
    setUpFakeTimers();

    const { mealRepo, burger, salad, getParsedStorageValue } =
      createMealRepository();

    await lastValueFrom(mealRepo.addMeal(burger));

    await vi.advanceTimersByTimeAsync(100);

    await lastValueFrom(mealRepo.addMeal(salad));

    await vi.advanceTimersByTimeAsync(190);

    expect(getParsedStorageValue()).toBeNull();
  });

  it('coalesces multiple addMeal calls and updates the local storage after 300ms', async () => {
    setUpFakeTimers();

    const { mealRepo, burger, salad, getParsedStorageValue } =
      createMealRepository();

    await lastValueFrom(mealRepo.addMeal(burger));

    await vi.advanceTimersByTimeAsync(100);

    await lastValueFrom(mealRepo.addMeal(salad));

    await vi.advanceTimersByTimeAsync(210);

    expect(getParsedStorageValue()).toMatchObject([
      { name: 'Burger' },
      { name: 'Salad' },
    ]);
  });

  it('returns empty array when storage value is invalid', async () => {
    const { getMealRepo, setStorageValue } = setUpMealRepository();

    setStorageValue('invalid-value');

    /* Instantiate the repository once the storage is set up. */
    const mealRepo = getMealRepo();

    expect(await lastValueFrom(mealRepo.getMeals())).toEqual([]);
  });

  function createMealRepository() {
    const { getMealRepo, ...utils } = setUpMealRepository();
    return {
      ...utils,
      mealRepo: getMealRepo(),
    };
  }

  function setUpMealRepository() {
    TestBed.configureTestingModule({
      providers: [provideLocalStorageFake()],
    });

    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    const localStorage = TestBed.inject(LocalStorage);
    const localStorageKey = 'meals';

    return {
      burger,
      salad,
      getMealRepo: () => TestBed.inject(MealRepository),
      getParsedStorageValue: () => {
        const raw = localStorage.getItem(localStorageKey);
        return raw != null ? JSON.parse(raw) : null;
      },
      setStorageValue: (value: string) => {
        localStorage.setItem(localStorageKey, value);
      },
    };
  }

  function setUpFakeTimers() {
    vi.useFakeTimers();

    onTestFinished(() => {
      vi.useRealTimers();
    });
  }
});
