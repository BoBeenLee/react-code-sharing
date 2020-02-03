import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components/native";

import XEIcon from "@shared/components/icon/XEIcon/XEIcon.app";
import {
  Bold12,
  Bold20
} from "@shared/components/text/Typographies/Typographies.app";
import ScaleableButton from "src/components/button/ScaleableButton";
import images from "@shared/images";
import HelloWorldWebview from "src/components/webview/HelloWorldWebview";
import { IStore } from "src/stores/Store";
import { iosStatusBarHeight } from "src/utils/device";

import { test } from "@shared/sharedTest";

interface IInject {
  store: IStore;
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
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

  public componentDidMount() {
    this.props.store.initializeApp();
  }

  public render() {
    const { todoTest } = this.props.store.todoStore;
    return (
      <Container>
        <ScaleableButton>
          <Name>Hello</Name>
        </ScaleableButton>
        <Name>
          {this.props.store!.appStateStatus}123{test()}
        </Name>
        <HelloWorldWebview />
        <LottieView
          style={{
            width: 100,
            height: 100,
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
