import { signal } from '@angular/core';
import { watch } from './watch';

describe(watch, () => {
  it('notifies when the value changes', () => {
    const count = signal(0);

    const watchedCount = watch(count);

    count.set(1);

    expect(watchedCount()).toBe(1);
  });

  it('does not notify if value is not reactive', () => {
    let count = 0;

    const watchedCount = watch(() => count);

    ++count;

    expect(watchedCount()).toBe(0);
  });
});
