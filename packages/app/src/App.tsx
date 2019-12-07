import { Provider } from "mobx-react";
import React, { Component } from "react";

import SplashScreen from "./screens/SplashScreen";
import Store from "./stores/Store";

interface IProps {
  dummy?: any;
}

const store = Store.create();

export default class App extends Component<IProps> {
  public render() {
    return (
      <Provider store={store}>
        <SplashScreen />
      </Provider>
    );
  }
}
