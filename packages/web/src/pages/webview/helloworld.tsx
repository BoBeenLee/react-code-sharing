import { PageRendererProps } from "gatsby";
import React, { Component } from "react";

import { IWebPayload, IAppPayload } from "@shared/webviews/helloworld";
import { getReactNativeWebView } from "src/utils/webview";

class HelloWorld extends Component<PageRendererProps> {
  constructor(props: any) {
    super(props);
    window.addEventListener("message", this.onMessage);
  }
  public componentDidMount() {
    getReactNativeWebView<IAppPayload>({ test: "hello world" });
  }

  public render() {
    return <div>Hello World Hello World</div>;
  }

  private onMessage = (message: MessageEvent) => {
    if (!message.data) {
      return;
    }
    try {
      const payload = JSON.parse(message.data) as IWebPayload;
      console.log(payload.test);
    } catch (error) {
      // NOTHING
    }
  };
}

export default HelloWorld;
