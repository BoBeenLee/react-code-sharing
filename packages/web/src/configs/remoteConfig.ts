import _ from "lodash";
import { firebaseInstance } from "src/configs/firebase";

import { remoteConfigFactory } from "@shared/configs/remoteConfig";

export const initialize = async () => {
  try {
    const remoteConfig = firebaseInstance().remoteConfig();
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
    remoteConfig.defaultConfig = {
      test: "Welcome"
    };
    await remoteConfig.fetchAndActivate();
  } catch (error) {
    return;
  }
};

export const firebaseRemoteConfig = _.once(() => {
  const getStringValue = async (key: string) => {
    return firebaseInstance()
      .remoteConfig()
      .getString(key);
  };
  const getBooleanValue = async (key: string) => {
    return firebaseInstance()
      .remoteConfig()
      .getBoolean(key);
  };
  return remoteConfigFactory(getStringValue, getBooleanValue);
});
