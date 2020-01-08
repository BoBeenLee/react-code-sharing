import _ from "lodash";
import { getSnapshot, types } from "mobx-state-tree";

interface IToastData {
  id: string;
  message: string;
  delay: number;
}

const DEFAULT_DELAY_SECONDS = 1500;

const ToastStore = types
  .model("ToastStore", {
    toastMap: types.optional(types.map(types.frozen<IToastData>()), {})
  })
  .views(self => {
    return {
      get toasts() {
        const toastMap = getSnapshot(self.toastMap);
        return _.orderBy(_.values(toastMap), ["id"], ["asc"]);
      }
    };
  })
  .actions(self => {
    const showToastWithDelay = (
      message: string,
      delaySeconds: number | null
    ) => {
      const id = _.uniqueId();
      self.toastMap.set(id, {
        delay: delaySeconds || DEFAULT_DELAY_SECONDS,
        id,
        message
      });
    };

    const showToast = (message: string) => {
      showToastWithDelay(message, DEFAULT_DELAY_SECONDS);
    };

    const dismissToast = (id: string) => {
      self.toastMap.delete(id);
    };

    return {
      dismissToast,
      showToast,
      showToastWithDelay
    };
  });

export type IToastStore = typeof ToastStore.Type;

export default ToastStore;
