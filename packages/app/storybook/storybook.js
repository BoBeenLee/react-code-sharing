import React, { Component } from "react";
import { getStorybookUI, configure } from "@storybook/react-native";
import { Navigation } from "react-native-navigation";
import SplashScreen from "react-native-splash-screen";

import { colors } from "../src/styles";

configure(() => {
  require("./stories");
}, module);

const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

class StorybookUIHMRRoot extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <StorybookUIRoot />;
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
        backgroundColor: colors.white,
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
