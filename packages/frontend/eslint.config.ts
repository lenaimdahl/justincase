import eslintConfig from '@ffflorian/eslint-config-react';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  eslintConfig,
  {
    rules: {
      'no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 0.5, 0.6, 1, 2, 3, 7, 10, 24, 60, 100, 400, 401, 403, 404, 500, 502, 503, 1000, 3000],
        },
      ],
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['**/i18n/**'],
    rules: {
      'import/no-named-as-default-member': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
]);
