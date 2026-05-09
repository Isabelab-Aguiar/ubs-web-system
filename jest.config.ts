import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  collectCoverageFrom: [
    'src/components/ui/button.tsx',
    'src/components/ui/badge.tsx',
    'src/components/ui/form-field.tsx',
    'src/components/ui/input.tsx',
    'src/components/ui/select.tsx',
    'src/components/ui/textarea.tsx',
    'src/components/features/announcements/announcement-form.tsx',
    'src/hooks/use-debounce.ts',
    'src/hooks/use-permissions.ts',
    'src/lib/validations/announcement.schema.ts',
  ],
  coverageThreshold: {
    global: { lines: 70, functions: 70, branches: 70, statements: 70 },
  },
};

export default config;
