import eslintBaseConfig from '@ffflorian/eslint-config';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  eslintBaseConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      'import/no-named-as-default-member': 'off',
      'no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 0.5, 0.6, 1, 2, 3, 7, 10, 24, 60, 100, 400, 401, 403, 404, 500, 502, 503, 1000, 3000],
        },
      ],
      'react-hooks/set-state-in-effect': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
