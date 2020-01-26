import React, { Component } from "react";
import {
  getStorybookUI,
  configure
} from "@storybook/react-native";
import { Navigation } from "react-native-navigation";
import SplashScreen from "react-native-splash-screen";

import ContainerWithStatusBar from "src/components/ContainerWithStatusBar";
// import withStore from "src/hocs/withStore";
// import { getRootStore } from "src/stores/Store";

configure(() => {
  require("../src/components/index.stories.tsx");
}, module);

const StorybookUIRoot = getStorybookUI({
  port: 7007,
  onDeviceUI: false,
  resetStorybook: true,
  disableWebsockets: true
});

class StorybookUIHMRRoot extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ContainerWithStatusBar>
        <StorybookUIRoot />
      </ContainerWithStatusBar>
    );
  }
}

function start() {
  Navigation.registerComponent("storybook.UI", () => StorybookUIHMRRoot);

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        animate: false,
        drawBehind: true,
        visible: false
      },
      layout: {
        backgroundColor: "#fff",
        orientation: ["portrait"]
      },
      statusBar: {
        backgroundColor: "white",
        style: "dark"
      }
    });

    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: "storybook.UI"
              }
            }
          ],
          id: "storybook.UI"
        }
      }
    });
  });
}

export default start;
