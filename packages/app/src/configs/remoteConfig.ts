import rnFirebaseRemoteConfig from "@react-native-firebase/remote-config";

import { isProduction } from "src/configs/env";
import { remoteConfigFactory } from "@shared/configs/remoteConfig";
import { once } from "@shared/utils/common";

const buildRemoteConfig = once(async () => {
  const remoteConfig = rnFirebaseRemoteConfig();
  remoteConfig.setConfigSettings({
    isDeveloperModeEnabled: !isProduction()
  });
  remoteConfig.setDefaults({});
  await remoteConfig.fetch(0);
  remoteConfig.fetchAndActivate();
  return remoteConfig;
});

export const firebaseRemoteConfig = once(() => {
  const getStringValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    const value = await remoteConfig.getValue(key);
    return value.value as string;
  };
  const getBooleanValue = async (key: string) => {
    const remoteConfig = await buildRemoteConfig();
    const value = await remoteConfig.getValue(key);
    return value.value ? Boolean(value.value) : false;
  };
  return remoteConfigFactory(getStringValue, getBooleanValue);
});
