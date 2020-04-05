import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";

import { getReactNativeWebView } from "src/utils/webview";

export interface IWithWebviewProps<WP, WR> {
  webviewProps: IProps<WP, WR>;
}

interface IProps<WP, WR> {
  webviewProps: WP;
  onWebviewProps: WR;
}

interface IStates<WP> {
  webviewProps: WP;
}

const withWebview = <WP, WR>(
  defaultWebviewProps: WP,
  actionFactory: (sendPostMessage: (data: any) => void) => WR
) => <P extends object>(TargetComponent: React.ComponentType<P>) => {
  class WithWebview extends React.PureComponent<P, IStates<WP>> {
    constructor(props: any) {
      super(props);
      this.state = { webviewProps: defaultWebviewProps };
      if (typeof window !== `undefined`) {
        window.addEventListener("message", this.onMessage);
      }
    }

    public render() {
      return (
        <TargetComponent {...this.props} webviewProps={this.webviewProps} />
      );
    }

    private get webviewProps(): IProps<WP, WR> {
      return {
        webviewProps: this.state.webviewProps,
        onWebviewProps: actionFactory(getReactNativeWebView)
      };
    }

    private onMessage = (message: MessageEvent) => {
      if (!message.data) {
        return;
      }
      try {
        const payload = JSON.parse(message.data) as WP;
        this.setState({
          webviewProps: payload
        });
      } catch (error) {
        // NOTHING
      }
    };
  }
  hoistNonReactStatic(WithWebview, TargetComponent);
  return WithWebview;
};

export default withWebview;
