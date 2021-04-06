module.exports = {
  // The root of your source code, typically /src

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testMatch: ['**/*.(test|spec).(ts|tsx)'],

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'jest.tsconfig.json',
    },
  },
  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', '__dirname'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
