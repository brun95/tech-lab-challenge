export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,js}',
      '!**/tests/**',
      '!**/node_modules/**',
    ],
  };