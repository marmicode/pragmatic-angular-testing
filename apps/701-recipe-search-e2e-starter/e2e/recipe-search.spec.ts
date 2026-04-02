import { expect, test } from '@playwright/test';

test('filter recipes by keywords', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Keywords').fill('bur');

  await expect(page.getByRole('heading', { level: 2 })).toHaveText(['Burger']);
});
