import React from "react";
import { compose } from "recompose";

import { initialize as firebaseInitialize } from "src/configs/firebase";
import { firebaseAnalytics } from "src/configs/analytics";
import { getRootStore } from "src/stores/Store";
import withStore from "src/hocs/withStore";
import withToast from "src/hocs/withToast";
import { isProduction } from "src/configs/env";
import { setupReactotron } from "ReactotronConfig";

import "src/styles/global.css";

const store = getRootStore();

if (!isProduction()) {
  setupReactotron(store);
}

export const wrapPageElement = ({ element }) => {
  firebaseAnalytics().setCurrentScreen(window.location.pathname + window.location.search);
  return element;
};

export const wrapRootElement = ({ element }) => {
  firebaseInitialize();

  const enhanceElement = compose(
    withToast,
    withStore(store)
  )(element);
  
  return enhanceElement;
};
