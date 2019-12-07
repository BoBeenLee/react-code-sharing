import { types } from "mobx-state-tree";

const Store = types.model({
  text: types.optional(types.string, "RNApp")
});

export type IStore = typeof Store.Type;

export default Store;
