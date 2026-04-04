import eslintConfig from '@ffflorian/eslint-config';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  eslintConfig,
  {
    rules: {
      'no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1, 2, 5, 8, 10, 12, 60, 200, 201, 204, 400, 401, 403, 404, 500, 502, 503, 1000, 3000, 60000],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'test/**/*.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
]);
