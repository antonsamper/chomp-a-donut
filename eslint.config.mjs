import js from '@eslint/js';
import imports from 'eslint-plugin-import';
import jestDom from 'eslint-plugin-jest-dom';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import testingLibrary from 'eslint-plugin-testing-library';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['coverage', 'dist'] },
    {
        extends: [testingLibrary.configs['flat/react'], jestDom.configs['flat/recommended']],
        files: ['**/*.test.{js,mjs,ts,tsx}'],
    },
    {
        extends: [
            js.configs.recommended,
            tseslint.configs.strict,
            tseslint.configs.stylistic,
            unicorn.configs.recommended,
            perfectionist.configs['recommended-alphabetical'],
            prettier,
        ],
        files: ['**/*.{js,mjs,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            import: imports,
            'react-dom': reactDom,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'react-x': reactX,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'arrow-body-style': ['error', 'always'],
            'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'unicorn/no-null': 'off',
        },
    },
);
