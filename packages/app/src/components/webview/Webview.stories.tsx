import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import styled from "styled-components/native";

import HelloWorldWebview from "src/components/webview/HelloWorldWebview";

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

storiesOf("Webview", module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add("HelloWorldWebview", () => {
    return <HelloWorldWebview />;
  });
