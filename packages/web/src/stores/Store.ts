import { types } from "mobx-state-tree";

import TodoStore from "@shared/stores/TodoStore";

const Store = types
  .model({
    todoStore: types.optional(TodoStore, {})
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
