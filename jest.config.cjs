/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!execa)/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
    '\\.[jt]sx?$': 'babel-jest',
  },
};
