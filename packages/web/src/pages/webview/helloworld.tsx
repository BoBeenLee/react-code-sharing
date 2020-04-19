import { PageRendererProps } from "gatsby";
import React from "react";

import {
  IWebviewProps,
  actionFactory,
  ActionType
} from "@shared/webviews/helloworld";
import withWebview, { IWithWebviewProps } from "src/hocs/withWebview";

interface IProps
  extends IWithWebviewProps<IWebviewProps, ActionType>,
    PageRendererProps {
  // NOTHING
}

class HelloWorld extends React.PureComponent<IProps> {
  public componentDidMount() {
    this.props.webviewProps.onWebviewProps.onHelloWorld("test123");
  }

  public render() {
    return (
      <button onClick={this.onHelloWorld}>
        {this.props.webviewProps.webviewProps.name}
      </button>
    );
  }

  private onHelloWorld = () => {
    const name = "hello2";
    this.props.webviewProps.onWebviewProps.onHelloWorld(name);
  };
}

export default withWebview<IWebviewProps, ActionType>(
  { name: "test" },
  actionFactory
)(HelloWorld);
