import AsyncStorage from "@react-native-community/async-storage";

import { storageFactory } from "@shared/configs/storage";
import { once } from "@shared/utils/common";

export const storage = once(() => {
  const setItem = (key: string, value: string) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.multiSet([[key, value]], errors => {
        if (_.isEmpty(errors)) {
          resolve(true);
          return;
        }
        reject(_.first(errors));
      });
    });
  };

  const getItem = (key: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      AsyncStorage.multiGet([key], (errors, result) => {
        if (_.isEmpty(errors)) {
          resolve(_.get(_.first(result), ["1"], "")!);
          return;
        }
        reject(_.first(errors));
      });
    });
  };

  const clear = () => {
    return AsyncStorage.clear();
  };
  return storageFactory(setItem, getItem, clear);
});
