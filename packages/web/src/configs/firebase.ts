import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/remote-config";

import env from "src/configs/env";
import { once } from "@shared/utils/common";

export const firebaseInstance = once(() => {
  if (!env.FIREBASE_CONFIG) {
    throw new Error("not exists firebase configs");
  }
  const firebaseConfig = env.FIREBASE_CONFIG;
  return firebase.initializeApp(firebaseConfig);
});
