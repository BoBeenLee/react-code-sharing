import { isBrowser } from "src/utils/navigator";
import { isEmpty } from "@shared/utils/common";

export const getReactNativeWebView = <T>(data: T) => {
  if (!isBrowser) {
    return;
  }
  if (isEmpty((window as any).ReactNativeWebView)) {
    return;
  }
  (window as any).ReactNativeWebView.postMessage(JSON.stringify(data));
};
