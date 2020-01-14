import _ from "lodash";
import { isBrowser } from "src/utils/navigator";

export const getReactNativeWebView = <T>(data: T) => {
  if (!isBrowser) {
    return;
  }
  if (_.isEmpty((window as any).ReactNativeWebView)) {
    return;
  }
  (window as any).ReactNativeWebView.postMessage(JSON.stringify(data));
};
