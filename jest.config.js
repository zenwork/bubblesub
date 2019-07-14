module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  modulePaths: ['<rootDir>/src/main', '<rootDir>src/test/unit'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/webpack/'],
  coverageDirectory: 'report/coverage',
  testRegex: 'src/.*\\.spec\\.ts$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  }
};
