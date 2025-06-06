module.exports = {
  rootDir: "..",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/test/**/*.test.ts"],
};
