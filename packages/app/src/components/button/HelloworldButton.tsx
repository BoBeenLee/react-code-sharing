import React, { useState } from "react";
import { ViewProps } from "react-native";

import RNWebview from "src/components/webview/RNWebview";
import { IWebviewProps, IOnWebviewProps } from "@shared/webviews/helloworld";
import { routes } from "src/configs/webview";

interface IProps extends IWebviewProps, IOnWebviewProps {
  style?: ViewProps["style"];
}

function HelloworldButton(props: IProps) {
  const { style, name, onHelloWorld } = props;
  return (
    <RNWebview<IWebviewProps, IOnWebviewProps>
      style={style}
      webviewProps={{ name }}
      onWebviewProps={{ onHelloWorld }}
      source={{ uri: routes.helloworld }}
    />
  );
}

export default HelloworldButton;
