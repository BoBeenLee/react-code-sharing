import _ from "lodash";
import firebase from "react-native-firebase";

import { isProduction } from "src/configs/env";
import { remoteConfigFactory } from "@shared/configs/remoteConfig";

const buildRemoteConfig = _.once(async () => {
  const remoteConfig = firebase.config();
  if (!isProduction()) {
    remoteConfig.enableDeveloperMode();
  }
  remoteConfig.setDefaults({});
  await remoteConfig.fetch(0);
  firebase.config().activateFetched();
  return remoteConfig;
});

export const firebaseRemoteConfig = _.once(() => {
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
