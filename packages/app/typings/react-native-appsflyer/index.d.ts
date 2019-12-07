declare module "react-native-appsflyer" {
  interface IInitOptions {
    devKey: string; // Appsflyer Dev key
    appId?: string; // Apple Application ID (for iOS only)
    isDebug?: boolean; // default - false, debug mode (optional)
  }

  function successCallback(result: any): void;
  function errorCallback(error: Error): void;

  function initSdk(
    options: IInitOptions,
    success: typeof successCallback,
    error: typeof errorCallback
  ): void;

  function trackEvent(
    eventName: string,
    eventValues?: object,
    success: typeof successCallback,
    error: typeof errorCallback
  ): void;

  export { initSdk, IInitOptions, trackEvent };
}
