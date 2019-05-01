import _ from "lodash";
import React from "react";
import { mst } from "reactotron-mst";
import Reactotron from "reactotron-react-native";

import { IStore } from "src/stores";
import { isProduction } from "./src/configs/environment";
import AsyncStorage from "./src/utils/asyncStorage";

const isReactotron = () => {
  return __DEV__;
};

let overlay = _.identity;
const setupReactotron = (store: IStore) => {
  (Reactotron as any)
    .configure({
      name: "app"
    })
    .useReactNative()
    .use(mst())
    .connect();
  (Reactotron as any).trackMstNode(store);
  Reactotron.use(__ => ({
    onCommand: async ({ type, payload }) => {
      if (type === "custom" && payload === "clearAllAsyncStorage") {
        await AsyncStorage.clear();
      }
    }
  }));

  overlay = (Reactotron as any).overlay;
  (console as any).tron = Reactotron;
};

const withOverlay: any = (App: React.ReactNode) => {
  return overlay(App);
};

const reactotronLog = (args: any) => {
  if (!isProduction()) {
    Reactotron.log(args);
  }
};

export { setupReactotron, withOverlay, isReactotron, reactotronLog };
