import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components/native";

import XEIcon from "src/components/icon/XEIcon";
import { Bold12, Bold20 } from "src/components/text/Typographies";
import images from "src/images";
import TestWebview from "src/screens/webview/TestWebview";
import { IStore } from "src/stores/Store";
import { iosStatusBarHeight } from "src/utils/device";

import { test } from "@shared/sharedTest";

interface IInject {
  store: IStore;
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${iosStatusBarHeight(false)}px;
`;

const Name = styled(Bold20)`
  color: #000;
`;

@inject(
  ({ store }: { store: IStore }): IInject => ({
    store
  })
)
@observer
class SplashScreen extends React.Component<IInject> {
  public animation: any = null;

  public render() {
    const { todoTest } = this.props.store.todoStore;
    return (
      <Container>
        <Name>
          {this.props.store!.appStateStatus}123{test()}
        </Name>
        <TestWebview />
        <LottieView
          style={{
            backgroundColor: "#eee",
            opacity: 0.5
          }}
          ref={animation => {
            this.animation = animation;
          }}
          source={images.animation}
        />
        <XEIcon name="close" color="#800" size={50} />
      </Container>
    );
  }
}

export default SplashScreen;
