import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import styled from "styled-components/native";

import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
import RNWebview from "src/components/RNWebview";
import { routes } from "src/configs/webview";

const Content = styled(RNWebview)`
  width: 300px;
  height: 300px;
`;

class HelloWorldWebview extends Component {
  public webview = React.createRef<RNWebview>();

  public componentDidMount() {
    if (this.webview.current) {
      this.webview.current.sendPostMessage({ message: "helloworld" });
    }
  }

  public render() {
    return <Content ref={this.webview} onMessage={this.onMessage} source={{ uri: routes.helloworld }} />;
  }

  private onMessage = (event: WebViewMessageEvent) => {
  };
}

export default HelloWorldWebview;
