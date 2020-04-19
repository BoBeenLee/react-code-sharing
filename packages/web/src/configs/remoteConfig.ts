import { firebaseInstance } from "src/configs/firebase";

import { remoteConfigFactory } from "@shared/configs/remoteConfig";
import { once } from "@shared/utils/common";

const buildRemoteConfig = once(async () => {
  const remoteConfig = firebaseInstance().remoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  remoteConfig.defaultConfig = {};
  await remoteConfig.fetchAndActivate();
  return remoteConfig;
});

export const firebaseRemoteConfig = once(() => {
  const getStringValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    return remoteConfig.getString(key);
  };
  const getBooleanValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    return remoteConfig.getBoolean(key);
  };
  return remoteConfigFactory(getStringValue, getBooleanValue);
});
