import _ from "lodash";
import { Permission, PermissionsAndroid } from "react-native";
import Permissions from "react-native-permissions";

import { reactotronLog } from "../../ReactotronConfig";
import { delay } from "../utils/dateTime";

const removeRequestAuth = (requestAuths: string[], auth: string) => {
  return (requestAuths = requestAuths.filter(
    requestAuth => requestAuth !== auth
  ));
};

const checkAndRequestAuths = async (
  auths: string[],
  successCallback: () => Promise<void>
) => {
  if (_.isEmpty(auths)) {
    await successCallback();
    return;
  }
  const nextAuth = _.first(auths)!;
  const requestAuths = [...auths];
  if (nextAuth === "cameraRoll") {
    await requestCameraPermission("android.permission.CAMERA");
    await checkAndRequestAuths(
      removeRequestAuth(requestAuths, nextAuth),
      successCallback
    );
    return;
  }
  const status = await Permissions.check(nextAuth);

  reactotronLog(`${nextAuth} ${status}`);
  if (status !== "authorized") {
    Permissions.request(nextAuth).then(async stat => {
      reactotronLog(`${nextAuth} ${stat}11`);
      if (stat === "authorized") {
        await checkAndRequestAuths(
          removeRequestAuth(requestAuths, nextAuth),
          successCallback
        );
        return;
      } else if (stat !== "denied") {
        await delay(500);
        await checkAndRequestAuths(requestAuths, successCallback);
      }
    });
  } else {
    await checkAndRequestAuths(
      removeRequestAuth(requestAuths, nextAuth),
      successCallback
    );
  }
};

const requestCameraPermission = async (auth: Permission) => {
  try {
    const granted = await PermissionsAndroid.request(auth);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      reactotronLog("You can use the camera");
    } else {
      reactotronLog("Camera permission denied");
    }
  } catch (err) {
    // console.warn(err)
  }
};

export { removeRequestAuth, checkAndRequestAuths };
