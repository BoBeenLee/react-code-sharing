import _ from "lodash";
import { reaction } from "mobx";
import { addDisposer, types } from "mobx-state-tree";
import { AppState, AppStateStatus } from "react-native";
import DeviceInfo from "react-native-device-info";

import { reactotronLog } from "../../ReactotronConfig";
import { getBugsnag } from "../configs/bugsnag";
import Navigator from "./Navigator";

const Store = types
  .model("Store", {
    appStateStatus: types.frozen<AppStateStatus>(AppState.currentState),
    navigator: types.optional(Navigator, {}),
  })
  .actions(self => {
    const setAppStateStatus = (appState: AppStateStatus) => {
      self.appStateStatus = appState;
    };

    return {
      setAppStateStatus
    };
  });

export type IStore = typeof Store.Type;
export interface IStores {
  store: IStore;
}

const getStore = (stores: any): IStore => stores.store;

let store: IStore | null = null;
const getRootStore = (): IStore => {
  if (store === null) {
    store = Store.create(
      {
        appStateStatus: AppState.currentState
      },
      {
        bugsnag: getBugsnag(),
        reactotronLog
      }
    );
  }
  return store;
};

export default Store;
export { getStore, getRootStore };
