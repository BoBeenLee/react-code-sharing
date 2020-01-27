import { flow, types } from "mobx-state-tree";
import { AppState, AppStateStatus } from "react-native";

import TodoStore from "@shared/stores/TodoStore";
import { initialize as initializeAnalytics } from "src/configs/analytics";

const Store = types
  .model({
    appStateStatus: types.frozen<AppStateStatus>(AppState.currentState),
    todoStore: types.optional(TodoStore, {})
  })
  .actions(self => {
    const setAppStateStatus = (appState: AppStateStatus) => {
      self.appStateStatus = appState;
    };

    const initializeApp = flow(function*() {
      initializeAnalytics();
    });

    return {
      setAppStateStatus,
      initializeApp
    };
  });

export type IStore = typeof Store.Type;

let store: IStore | null = null;
const getRootStore = (): IStore => {
  if (store === null) {
    store = Store.create({
      appStateStatus: AppState.currentState
    });
  }
  return store;
};

export default Store;
export { getRootStore };
