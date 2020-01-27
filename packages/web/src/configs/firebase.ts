import firebase from "firebase/app";

import "firebase/analytics";
import _ from "lodash";

import env from "./env";

export const firebaseInstance = _.once(() => {
  if (!env.FIREBASE_CONFIG) {
    throw new Error("not exists firebase configs");
  }
  const firebaseConfig = env.FIREBASE_CONFIG;
  return firebase.initializeApp(firebaseConfig);
});
