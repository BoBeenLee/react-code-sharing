import React from "react";
import { initialize as firebaseInitialize } from "src/configs/firebase";
import { setCurrentScreen } from "src/configs/analytics";

import "src/styles/global.css";

export const wrapPageElement = ({ element }) => {
  setCurrentScreen(window.location.pathname + window.location.search);
  return element;
};

export const wrapRootElement = ({ element }) => {
  firebaseInitialize();
  return element;
};
