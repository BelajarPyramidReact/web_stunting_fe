module.exports = {
    transformIgnorePatterns: [
      "node_modules/(?!(axios|axios-mock-adapter)/)"
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  };