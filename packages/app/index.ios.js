import { isStorybook } from "./src/configs/environment";

if (isStorybook()) {
  const start = require("./storybook").default;
  start();
} else {
  const start = require("./src/App").default;
  start();
}
