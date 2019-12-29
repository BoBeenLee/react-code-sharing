import React, { Component, PureComponent } from "react";
import { ViewProps } from "react-native";
import { WebView } from "react-native-webview";
import {
  WebViewMessageEvent,
  WebViewSource
} from "react-native-webview/lib/WebViewTypes";

interface IProps {
  style?: ViewProps["style"];
  source: WebViewSource;
  onMessage: (event: WebViewMessageEvent) => void;
}

class RNWebview extends PureComponent<IProps> {
  public webview = React.createRef<WebView>();

  public render() {
    const { style, source, onMessage } = this.props;

    return (
      <WebView
        style={style}
        originWhitelist={["*"]}
        ref={this.webview}
        androidHardwareAccelerationDisabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={false}
        onMessage={onMessage}
        source={source}
      />
    );
  }

  public sendPostMessage = (data: object) => {
    this.webview.current!.injectJavaScript(`
            (function(){
            window.postMessage('${data}','*');
            })();
        `);
  };
}

export default RNWebview;
