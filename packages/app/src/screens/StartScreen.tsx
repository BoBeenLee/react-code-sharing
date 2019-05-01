import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { StatusBar, View, Text } from "react-native";
import styled from "styled-components/native";

import {
  getStore,
  INavigator,
  IStores
} from "../stores";
import { colors } from "../styles";
import { topbars } from "./styles";

interface IInject {
  navigator: INavigator;
}

interface IProps extends IInject {
  componentId: string;
}

type UpdateType = "CODEPUSH" | "STORE";

interface IStates {
  appVersion: string;
  description: string;
  isUpdateModal: boolean;
  updateType: UpdateType | null;
  isLoading: boolean;
}

const Container = styled.View`
  flex: 1;
`;

@inject(
  (stores: IStores): IInject => ({
    navigator: getStore(stores).navigator
  })
)
@observer
class StartScreen extends Component<IProps, IStates> {
  public static options() {
    return {
      bottomTabs: {
        visible: false
      },
      layout: {
        backgroundColor: "white"
      },
      statusBar: {
        backgroundColor: "#00000039",
        drawBehind: true
      },
      topBar: topbars.emptyTopBar()
    };
  }

  public render() {
    return (
      <Container>
        <StatusBar
          hidden={true}
          translucent={true}
          backgroundColor={"transparent"}
        />
        <View>
          <Text>Hello World</Text>
        </View>
      </Container>
    );
  }
}

export default StartScreen;
