import _ from "lodash";
import firebase from "react-native-firebase";

import { isProduction } from "src/configs/env";
import { remoteConfigFactory } from "@shared/configs/remoteConfig";

export const initialize = async () => {
  try {
    const remoteConfig = firebase.config();
    if (!isProduction()) {
      remoteConfig.enableDeveloperMode();
    }
    remoteConfig.setDefaults({});
    await remoteConfig.fetch(0);
    firebase.config().activateFetched();
  } catch (error) {
    return;
  }
};

export const firebaseRemoteConfig = _.once(() => {
  const getStringValue = async (key: string) => {
    const value = await firebase.config().getValue(key);
    return value.val();
  };
  const getBooleanValue = async (key: string) => {
    const value = await firebase.config().getValue(key);
    return value.val() ? Boolean(value.val()) : false;
  };
  return remoteConfigFactory(getStringValue, getBooleanValue);
});
