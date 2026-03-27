import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
import vitestAngularPreset from './vitest-angular-preset';

const emulatedTestPatterns = ['src/**/!(*.browser).spec.ts'];
const browserTestPatterns = ['src/**/*.browser.spec.ts'];
const isCI = !!process.env.CI;

export default mergeConfig(
  mergeConfig(viteConfig, vitestAngularPreset),
  defineConfig({
    test: {
      globals: true,
      setupFiles: ['src/test-setup.ts'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/whiskmate',
        provider: 'v8',
      },
      watch: false,
      pool: 'threads',
      isolate: false,
      testTimeout: isCI ? 3_000 : 500,
      projects: [
        {
          extends: true,
          test: {
            name: 'emulated',
            environment: 'jsdom',
            include: emulatedTestPatterns,
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: browserTestPatterns,
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  }),
);
