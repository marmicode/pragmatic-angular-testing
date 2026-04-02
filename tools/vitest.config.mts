import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

const narrowTestPatterns = ['**/!(*.wide).spec.ts'];
const wideTestPatterns = ['**/*.wide.spec.ts'];

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../coverage/tools',
        provider: 'v8',
      },
      environment: 'node',
      watch: false,
      pool: 'threads',
      isolate: false,
      projects: [
        {
          extends: true,
          test: {
            name: 'narrow',
            include: narrowTestPatterns,
          },
        },
        {
          extends: true,
          test: {
            name: 'wide',
            include: wideTestPatterns,
          },
        },
      ],
    },
  }),
);
