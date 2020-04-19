import { storageFactory } from "@shared/configs/storage";
import { once } from "@shared/utils/common";

export const storage = once(() => {
  const setItem = (key: string, value: string) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, value);
        resolve(true);
        return;
      } catch (error) {
        reject(error);
      }
    });
  };

  const getItem = (key: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        resolve(localStorage.getItem(key) ?? "");
        return;
      } catch (error) {
        reject(error);
      }
    });
  };

  const clear = () => {
    return localStorage.clear();
  };
  return storageFactory(setItem, getItem, clear);
});
