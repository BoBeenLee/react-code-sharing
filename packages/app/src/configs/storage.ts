import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";

import { isJSON } from "@shared/utils/common";
import { getOS, getVersion } from "src/utils/device";
import { storageFactory } from "@shared/configs/storage";

export const storage = _.once(() => {
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