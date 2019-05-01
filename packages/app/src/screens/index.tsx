import hoistNonReactStatic from "hoist-non-react-statics";
import _ from "lodash";
import { Navigation } from "react-native-navigation";

import {
  withAppState,
  withNavigator,
  withStore
} from "../hocs";
import { SCREEN_IDS } from "./constant";
import StartScreen from "./StartScreen";

interface IScreenProps {
  id: string;
  Component: React.ComponentType<any>;
}

export function registerScreens(
  store: any,
  withOverlay: any = _.identity,
  withSplash: any = _.identity
) {
  const screens: IScreenProps[] = [
    {
      Component: StartScreen,
      id: SCREEN_IDS.StartScreen
    },
  ];

  _.forEach(screens, screen => {
    const { id, Component } = screen;
    const WithOverlayAndMST = withSplash(
      withStore(withOverlay(Component), store)
    );
    const WithNavigator = withNavigator(WithOverlayAndMST, id);
    const WithVerifyUser = withAppState(WithNavigator);
    hoistNonReactStatic(WithVerifyUser, Component);
    Navigation.registerComponent(id, () => WithVerifyUser);
  });
}

export { SCREEN_IDS };
