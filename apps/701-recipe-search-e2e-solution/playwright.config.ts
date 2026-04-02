import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
import { sep } from 'node:path';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';
const projectName = __dirname.split(sep).pop();
const timeout = 5_000;

export default defineConfig(
  nxE2EPreset(__filename, {
    testDir: 'e2e',
  }),
  {
    timeout,
    webServer: {
      command: `pnpm exec nx serve ${projectName}`,
      url: baseURL,
      reuseExistingServer: true,
      cwd: workspaceRoot,
    },
    expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      actionTimeout: timeout,
      baseURL,
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
    },
    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
  },
);
