import { Provider } from "mobx-react";
import React from "react";
import "mobx-react-lite/batchingForReactDom";

import { IStore } from "src/stores/Store";

const withStore = (store: IStore) => (element: any): any => {
  return <Provider store={store}>{element}</Provider>;
};

export default withStore;
