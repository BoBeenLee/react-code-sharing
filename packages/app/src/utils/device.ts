import { Dimensions, Platform, StatusBar } from "react-native";
import DeviceInfo from "react-native-device-info";
import uuid from "uuid";

import AsyncStorage from "./asyncStorage";

export interface IGeolocation {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  timestamp: number;
}

const getOS = (): string => Platform.OS;

const isAndroid = () => Platform.OS === "android";

const getBrand = (): string => DeviceInfo.getBrand();

const getTimezone = (): string => DeviceInfo.getTimezone();

const getAppVersion = (): string => DeviceInfo.getVersion();

const getSystemVersion = (): string => DeviceInfo.getSystemVersion();

const getLocale = (): string => DeviceInfo.getDeviceLocale();

const getDeviceId = (): string => DeviceInfo.getDeviceId();

const getSessionId = async (): Promise<string> => {
  let sessionId = await AsyncStorage.getItem(AsyncStorage.FIELD.SESSION_ID);
  if (!sessionId) {
    sessionId = uuid();
    await AsyncStorage.setItem(AsyncStorage.FIELD.SESSION_ID, sessionId);
  }
  return sessionId;
};

const refereshSessionId = async (): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorage.FIELD.SESSION_ID, uuid());
};

const getIpAddress = (): Promise<string | Error> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ip = await DeviceInfo.getIPAddress();
      resolve(ip);
    } catch (e) {
      reject(e);
    }
  });
};

const getGeolocation = (): Promise<IGeolocation | {}> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position!);
      },
      error => {
        reject(error);
      }
    );
  });
};

export function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    android: StatusBar.currentHeight,
    ios: ifIphoneX(safe ? 44 : 30, 20)
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

const getDeviceWidth = () => Dimensions.get("window").width;

const getDeviceHeight = () => Dimensions.get("window").height;

export {
  isAndroid,
  getOS,
  getBrand,
  getDeviceWidth,
  getDeviceHeight,
  getLocale,
  getDeviceId,
  getTimezone,
  getAppVersion,
  getSystemVersion,
  getIpAddress,
  getGeolocation,
  getSessionId,
  refereshSessionId
};
