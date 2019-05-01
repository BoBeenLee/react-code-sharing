import _ from "lodash";
import firebase from "react-native-firebase";

import { isProduction } from "./environment";

interface IEventResult {
  eventType?: any;
  [key: string]: any;
}

export type AnalyticsFunction<IProps, IStates> = (
  props: IProps,
  state: IStates,
  args
) => IEventResult | Promise<IEventResult>;

function initAnalytics() {
  if (!isProduction()) {
    firebase.analytics().setAnalyticsCollectionEnabled(false);
  }
}

function firebaseLogEvent(eventData: IEventResult) {
  if (!eventData.eventType) {
    return;
  }
  firebase.analytics().logEvent(eventData.eventType, eventData);
}

function firebaseSetUserId(userId: string) {
  firebase.analytics().setUserId(userId);
}

function firebaseTracking<IProps, IStates>(
  getData: AnalyticsFunction<IProps, IStates>
): any {
  return function FirebaseTracking(__, propName, descriptor) {
    const isArrowFunction = !!descriptor.initializer;
    if (isArrowFunction) {
      return makeFirebaseArrowFunction(propName, descriptor, getData);
    }
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args) {
      const eventData = await getData(this.props, this.state, args);
      firebaseLogEvent(eventData);
      const result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}

function tracking<IProps, IStates>(
  getData: AnalyticsFunction<IProps, IStates>
): any {
  return function Tracking(__, propName, descriptor) {
    const isArrowFunction = !!descriptor.initializer;
    if (isArrowFunction) {
      return makeFirebaseArrowFunction(propName, descriptor, getData);
    }
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args) {
      const eventData = await getData(this.props, this.state, args);
      firebaseLogEvent(eventData);
      const result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}

function makeFirebaseArrowFunction<IProps, IStates>(
  propName: string,
  descriptor: any,
  getData: AnalyticsFunction<IProps, IStates>
) {
  function initializerProp($this: any) {
    return async (...args) => {
      const eventData = await getData($this.props, $this.state, args);
      firebaseLogEvent(eventData);
      const result = descriptor.initializer.call($this)(...args);
      return result;
    };
  }

  return {
    ...descriptor,
    initializer() {
      return (this[propName] = initializerProp(this));
    }
  };
}

export {
  initAnalytics,
  firebaseSetUserId,
  firebaseLogEvent,
  firebaseTracking,
  tracking
};
