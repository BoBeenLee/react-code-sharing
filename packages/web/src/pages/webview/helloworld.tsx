import _ from "lodash";
import { PageRendererProps } from "gatsby";
import React, { Component } from "react";

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

class HelloWorld extends Component<IProps> {
  public componentDidMount() {
    this.props.webviewProps.onWebviewProps.onHelloWorld("test");
  }

  public render() {
    return (
      <button onClick={_.partial(this.onHelloWorld, "hello2")}>
        {this.props.webviewProps.webviewProps.name}
      </button>
    );
  }

  private onHelloWorld = (name: string) => {
    this.props.webviewProps.onWebviewProps.onHelloWorld(name);
  };
}

export default withWebview<IWebviewProps, ActionType>(
  { name: "test" },
  actionFactory
)(HelloWorld);
