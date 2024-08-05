import { fixupPluginRules } from '@eslint/compat'
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importEslint from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImport from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        parser: "@babel/eslint-parser",
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImport,
      import: importEslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      // Fixable rules
      'react/prop-types': 'off',
      curly: [1, 'all'],
      semi: [1, 'never'],
      quotes: [1, 'single', { avoidEscape: true }],
      'one-var': [1, 'never'],
      'sort-imports': 0,
      'import/order': 0,
      'simple-import-sort/imports': 1,
      'simple-import-sort/exports': 1,
      'import/first': 1,
      'import/no-duplicates': 1,
      'object-shorthand': [1, 'always'],
      'prefer-const': 1,
      // Compatible with prettier
      '@typescript-eslint/member-delimiter-style': [
        1,
        {
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multiline: {
            delimiter: 'none',
            requireLast: true,
          },
        },
      ],

      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': 1,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
