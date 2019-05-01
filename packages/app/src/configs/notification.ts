import { Platform } from "react-native";
import firebase from "react-native-firebase";

export async function initPush() {
  if (await !checkPermission()) {
    return;
  }

  createdChannelIfAndroid();
  initPushListener();
}

const checkPermission = async () => {
  if (await firebase.messaging().hasPermission()) {
    return true;
  }

  return await firebase.messaging().requestPermission();
};

const createdChannelIfAndroid = () => {
  if (Platform.OS === "ios") {
    return;
  }

  const channel = new firebase.notifications.Android.Channel(
    "test-channel",
    "Test Channel",
    firebase.notifications.Android.Importance.Max
  ).setDescription("My apps test channel");

  firebase.notifications().android.createChannel(channel);
};

const initPushListener = async () => {
  firebase.notifications().onNotification(({ title, body, data }) => {
    notifyLocalMessage(title, body, data);
  });

  firebase.notifications().onNotificationOpened(({ notification }) => {
    firebase
      .notifications()
      .removeDeliveredNotification(notification.notificationId);
    alert(JSON.stringify(notification.data));
  });
};

export const notifyLocalMessage = (
  title: string,
  body: string,
  data: object
) => {
  const notification = new firebase.notifications.Notification()
    .setNotificationId("notificationId")
    .setTitle(title)
    .setBody(body)
    .setData(data);

  notification.android
    .setChannelId("test-channel")
    .android.setSmallIcon("ic_launcher");

  firebase.notifications().displayNotification(notification);
};

export const getInitialNotification = () => {
  return firebase.notifications().getInitialNotification();
};
