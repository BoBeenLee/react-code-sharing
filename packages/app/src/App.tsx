import identity from "lodash/identity";
import { Navigation } from "react-native-navigation";

import {
  isReactotron,
  setupReactotron,
  withOverlay
} from "../ReactotronConfig";
import { initAnalytics } from "./configs/analytics";
import { initBugsnag } from "./configs/bugsnag";
import { initPush } from "./configs/notification";
import { ignoreWarning } from "./configs/yellobox";
import withSplash from "./hocs/withSplash";
import { registerScreens } from "./screens";
import { getRootStore } from "./stores/Store";

type IAppState = "active" | "inactive" | "unknown" | "background";

ignoreWarning();

async function start() {
  initBugsnag();
  initAnalytics();
  initPush();
  const store = getRootStore();

  if (isReactotron()) {
    setupReactotron(store);
    registerScreens(store, withOverlay, withSplash);
  } else {
    registerScreens(store, identity, withSplash);
  }

  Navigation.events().registerAppLaunchedListener(() => {
    store.navigator.start();
  });
}

export default start;
