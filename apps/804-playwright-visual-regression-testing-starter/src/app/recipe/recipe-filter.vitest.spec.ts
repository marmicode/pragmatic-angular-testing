import { outputBinding } from '@angular/core';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createSpy } from '@whiskmate/testing/create-spy';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilter } from './recipe-filter.ng';
import { TestBed } from '@angular/core/testing';

describe(RecipeFilter.name, () => {
  it('does not trigger filterChange output before debounce', async () => {
    const { filterChangeSpy, setInputValue } = await mountRecipeFilter();

    await setInputValue('Keywords', 'Cauliflower');

    await vi.advanceTimersByTimeAsync(290);

    expect(filterChangeSpy).not.toHaveBeenCalled();
  });

  it('triggers filterChange output after debounce', async () => {
    const { filterChangeSpy, setInputValue } = await mountRecipeFilter();

    await setInputValue('Keywords', 'Cauliflower');

    await vi.advanceTimersByTimeAsync(310);

    expect(filterChangeSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        keywords: 'Cauliflower',
      } satisfies Partial<RecipeFilterCriteria>),
    );
  });

  async function mountRecipeFilter() {
    vi.useFakeTimers();

    onTestFinished(() => {
      vi.useRealTimers();
    });

    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTimeAsync,
    });

    const filterChangeSpy = createSpy();

    TestBed.createComponent(RecipeFilter, {
      bindings: [outputBinding('filterChange', filterChangeSpy)],
    });
    await vi.runAllTimersAsync();

    return {
      filterChangeSpy,
      async setInputValue(
        label: 'Keywords' | 'Max Ingredients' | 'Max Steps',
        value: string,
      ) {
        const inputEl = screen.getByLabelText(label);
        await user.type(inputEl, value);
      },
    };
  }
});
