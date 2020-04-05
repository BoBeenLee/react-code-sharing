import React from "react";
import { compose } from "recompose";

import { getRootStore } from "src/stores/Store";
import withStore from "src/hocs/withStore";
import withToast from "src/hocs/withToast";

const store = getRootStore();

export const wrapRootElement = ({ element }) => {
  store.initializeApp();

  const enhanceElement = compose(withToast, withStore(store))(element);

  return enhanceElement;
};
