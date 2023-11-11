module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  moduleNameMapper: {
    '@domain/(.*)': ['<rootDir>/src/domain/$1'],
    '@shared/(.*)': ['<rootDir>/src/shared/$1'],
    '@filters/(.*)': ['<rootDir>/src/filters/$1'],
    '@helpers/(.*)': ['<rootDir>/src/helpers/$1'],
    '@constants/(.*)': ['<rootDir>/src/constants/$1'],
    '@decorators/(.*)': ['<rootDir>/src/decorators/$1']
  },
  testRegex: '.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.(ts|tsx)$': `ts-jest`
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src']
};
