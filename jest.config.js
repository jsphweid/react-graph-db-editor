module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).ts?(x)'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: { '~(.*)$': '<rootDir>/packages/$1/src' }
}
