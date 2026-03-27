import nx from '@nx/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  vitest.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'wm',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'wm',
          style: 'kebab-case',
        },
      ],
      'vitest/valid-title': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      /* Do not do this at home.
       * This is just meant to unclutter the exercise. */
      '@angular-eslint/template/alt-text': 'off',
    },
  },
]);
