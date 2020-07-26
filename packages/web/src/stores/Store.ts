import { flow, types } from "mobx-state-tree";

import { isDevelopment } from "src/configs/env";
import TodoStore from "@shared/stores/TodoStore";
import ToastStore from "@shared/stores/ToastStore";
import { initialize as initializeRequestAPI } from "@shared/apis/requestAPI";
import { initialize as initializeServer } from "@shared/apis/__mocks__/server";
import env from "src/configs/env";

const Store = types
  .model({
    todoStore: types.optional(TodoStore, {}),
    toastStore: types.optional(ToastStore, {})
  })
  .actions(self => {
    const initializeApp = flow(function*() {
      if (isDevelopment()) {
        initializeServer();
      }
      initializeRequestAPI(env.API_URL);
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
