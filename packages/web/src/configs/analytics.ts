import { firebaseInstance } from "src/configs/firebase";
import { firebaseAnalyticsFactory } from "@shared/configs/analytics";
import { createInjectDecorator } from "@shared/decorators/createInjectDecorator";
import { once } from "@shared/utils/common";

export const firebaseAnalytics = once(() => {
  const logEvent = (eventName: string, params: object) => {
    firebaseInstance()
      .analytics()
      .logEvent(eventName, params);
  };
  const setUserId = (userId: string) => {
    firebaseInstance()
      .analytics()
      .setUserId(userId);
  };
  const setCurrentScreen = (screenName: string) => {
    firebaseInstance()
      .analytics()
      .setCurrentScreen(screenName);
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
