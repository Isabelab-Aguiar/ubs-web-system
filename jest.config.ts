import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: { '^.+\\.(t|j)sx?$': 'ts-jest' },
  coverageThreshold: {
    global: { lines: 70, functions: 70, branches: 70, statements: 70 },
  },
};

export default config;
