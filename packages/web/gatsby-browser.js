import ReactGA from "react-ga";

import "src/styles/global.css";
import env from "src/configs/env";

export const wrapPageElement = ({ element }) => {
  if (env.GA_KEY && window) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return element;
};

export const wrapRootElement = ({ element }) => {
  if (env.GA_KEY) {
    ReactGA.initialize(env.GA_KEY);
  }

  return element;
};
