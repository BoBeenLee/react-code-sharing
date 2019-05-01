import isString from "lodash/isString";

import {
  getAppVersion,
  getBrand,
  getDeviceId,
  getGeolocation,
  getIpAddress,
  getLocale,
  getOS,
  getSessionId,
  getSystemVersion,
  getTimezone,
} from "./device";

interface ILogData {
  sessionId: string;
  userId: string;
  appVersion: string;
  geolocation: object;
  deviceInfo: object;
  ipAddress: string;
  screenName: string;
  actionName: string;
  contentName?: string;
  createdAt: number;
}

interface IRecord {
  Data: string;
}

const makeRecord = (data: Partial<ILogData>): IRecord => {
  return { Data: `${JSON.stringify(data)}\n` };
};

const makeCommonRecordObject = async (): Promise<Partial<ILogData>> => {
  try {
    const sessionId = await getSessionId();
    return {
      createdAt: Date.now(),
      sessionId,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const makeLaunchRecordObject = async (): Promise<Partial<ILogData>> => {
  try {
    const ipAddress = await getIpAddress();
    const geolocation = await getGeolocation();
    return {
      appVersion: getAppVersion(),
      deviceInfo: {
        brand: getBrand(),
        deviceId: getDeviceId(),
        language: getLocale(),
        os: getOS(),
        timezone: getTimezone(),
        version: getSystemVersion()
      },
      geolocation,
      ipAddress: isString(ipAddress) ? ipAddress : ""
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

export { makeRecord, makeLaunchRecordObject, makeCommonRecordObject };
