import firebase from "firebase/app";
import _ from "lodash";

import { firebaseAnalyticsFactory } from "@shared/configs/analytics";
import { createInjectDecorator } from "@shared/decorators/createInjectDecorator";

export const firebaseAnalytics = _.once(() => {
  return firebaseAnalyticsFactory(
    firebase.analytics().logEvent,
    firebase.analytics().setUserId,
    firebase.analytics().setCurrentScreen
  );
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
