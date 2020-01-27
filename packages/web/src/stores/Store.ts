import { flow, types } from "mobx-state-tree";

import TodoStore from "@shared/stores/TodoStore";
import ToastStore from "@shared/stores/ToastStore";
import { initialize as initializeRemoteConfig, firebaseRemoteConfig } from "src/configs/remoteConfig";

const Store = types
  .model({
    todoStore: types.optional(TodoStore, {}),
    toastStore: types.optional(ToastStore, {})
  })
  .actions(self => {
    const initializeApp = flow(function*() {
      yield initializeRemoteConfig();
    });
    return { initializeApp };
  });

export type IStore = typeof Store.Type;

let store: IStore | null = null;
const getRootStore = (): IStore => {
  if (store === null) {
    store = Store.create({});
  }
  return store;
};

export default Store;
export { getRootStore };
