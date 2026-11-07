import prettier from 'eslint-config-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
);
