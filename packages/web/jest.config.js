/* eslint-disable @typescript-eslint/no-var-requires */
const path = require(`path`);

module.exports = {
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
  moduleDirectories: ["node_modules", path.resolve(__dirname)],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`
  },
  testRegex: "(.*(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    "ts-jest": {
      babelConfig: ".babelrc"
    },
    __PATH_PREFIX__: ``
  },
  testURL: `http://localhost`
};
