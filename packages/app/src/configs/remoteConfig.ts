import firebase from "react-native-firebase";

import { isProduction } from "src/configs/env";
import { remoteConfigFactory } from "@shared/configs/remoteConfig";
import { once } from "@shared/utils/common";

const buildRemoteConfig = once(async () => {
  const remoteConfig = firebase.config();
  if (!isProduction()) {
    remoteConfig.enableDeveloperMode();
  }
  remoteConfig.setDefaults({});
  await remoteConfig.fetch(0);
  firebase.config().activateFetched();
  return remoteConfig;
});

export const firebaseRemoteConfig = once(() => {
  const getStringValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    const value = await remoteConfig.getValue(key);
    return value.val();
  };
  const getBooleanValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    const value = await remoteConfig.getValue(key);
    return value.val() ? Boolean(value.val()) : false;
  };
  return remoteConfigFactory(getStringValue, getBooleanValue);
});
