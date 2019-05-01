import { getRoot } from "mobx-state-tree";
import { AppStateStatus } from "react-native";
import {
  INavigator,
} from ".";

interface IStoreType {
  appStateStatus: AppStateStatus;
  navigator: INavigator;

  setAppStateStatus: (appState: AppStateStatus) => void;
}

export const getRootStore = (self: any): IStoreType => getRoot<any>(self);
