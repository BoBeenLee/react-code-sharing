import _ from "lodash";
import firebase from "react-native-firebase";

import { firebaseAnalyticsFactory } from "@shared/configs/analytics";
import { createInjectDecorator } from "@shared/decorators/createInjectDecorator";

export function initialize() {
  firebase.analytics().setAnalyticsCollectionEnabled(true);
}

export const firebaseAnalytics = _.once(() => {
  const logEvent = (eventName: string, params: object) => {
    firebase.analytics().logEvent(eventName, params);
  };
  const setUserId = (userId: string) => {
    firebase.analytics().setUserId(userId);
  };
  const setCurrentScreen = (screenName: string) => {
    firebase.analytics().setCurrentScreen(screenName);
  };
  return firebaseAnalyticsFactory(logEvent, setUserId, setCurrentScreen);
});

export function firebaseTracking<IProps, IStates>(
  trackingConsumer: (
    props: IProps,
    state: IStates,
    event: typeof firebaseAnalytics,
    args: any[]
  ) => void
): any {
  const func = async (props: IProps, state: IStates, args: any[]) => {
    trackingConsumer(props, state, firebaseAnalytics, args);
  };
  return createInjectDecorator(func);
}
