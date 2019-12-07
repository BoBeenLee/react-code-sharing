
export const getReactNativeWebView = (data: object) => {
    if (typeof window === "undefined") {
        return;
    }
    (window as any).ReactNativeWebView.postMessage(JSON.stringify(data));
}