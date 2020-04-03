import LottieView from "lottie-react-native";
import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components/native";

import XEIcon from "@shared/components/icon/XEIcon";
import { Bold12, Bold20 } from "@shared/components/text/Typographies";
import ScaleableButton from "src/components/button/ScaleableButton";
import images from "@shared/images";
import { IStore } from "src/stores/Store";
import { iosStatusBarHeight } from "src/utils/device";

import { test } from "@shared/sharedTest";
import HelloworldButton from "src/components/button/HelloworldButton";

interface IInject {
  store: IStore;
}

interface IStates {
  name: string;
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
class SplashScreen extends React.PureComponent<IInject, IStates> {
  public animation: any = null;

  constructor(props: IInject) {
    super(props);
    this.state = {
      name: "hello1"
    };
  }

  public componentDidMount() {
    this.props.store.initializeApp();
  }

  public render() {
    return (
      <Container>
        <ScaleableButton>
          <Name>Hello</Name>
        </ScaleableButton>
        <Name>
          {this.props.store!.appStateStatus}123{test()}
        </Name>
        <HelloworldButton
          name={this.state.name}
          onHelloWorld={this.onHelloWorld}
        />
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

  private onHelloWorld = ({ name }: { name: string }) => {
    this.setState({ name });
  };
}

export default SplashScreen;
