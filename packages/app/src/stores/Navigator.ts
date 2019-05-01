import _ from "lodash";
import { flow, types } from "mobx-state-tree";
import firebase from "react-native-firebase";
import { Navigation } from "react-native-navigation";

import { SCREEN_IDS } from "../screens/constant";
import { topbars } from "../screens/styles";
import { delay } from "../utils/dateTime";

const Navigator = types
  .model("Navigator", {
    currentComponentId: types.optional(types.string, ""),
    currentComponentName: types.optional(types.string, ""),
    loading: types.optional(types.boolean, false)
  })
  .actions(self => {
    const setCurrentComponent = (
      componentId: string,
      componentName: string
    ) => {
      self.currentComponentId = componentId;
      self.currentComponentName = componentName;
      firebase.analytics().setCurrentScreen(componentName);
      firebase.crashlytics().setStringValue("componentName", componentName);
    };

    const withNavigationLoading = flow(function* (
      navigationFunc: any,
      delaySeconds: number = 1500
    ) {
      if (!self.loading) {
        self.loading = true;
        navigationFunc();
        yield delay(delaySeconds);
        self.loading = false;
      }
    });

    const push = flow(function* (componentId: string, layout: any) {
      yield withNavigationLoading(() => {
        Navigation.push(componentId, layout);
      }, 500);
    });
    const pop = flow(function* (componentId: string, params?: any) {
      yield withNavigationLoading(() => {
        Navigation.pop(componentId, params);
      }, 300);
    });

    const popTo = flow(function* (componentId: string) {
      yield withNavigationLoading(() => {
        Navigation.popTo(componentId);
      }, 300);
    });

    const showModal = flow(function* (layout: any) {
      yield withNavigationLoading(() => {
        Navigation.showModal(layout);
      }, 500);
    });

    const showRootModal = flow(function* (layout: any) {
      yield withNavigationLoading(() => {
        Navigation.showModal({
          stack: {
            children: [layout]
          }
        });
      }, 500);
    });

    const dismissModal = flow(function* (componentId: string) {
      yield withNavigationLoading(() => {
        Navigation.dismissModal(componentId);
      }, 300);
    });

    const dismissAllModals = flow(function* () {
      yield withNavigationLoading(() => {
        Navigation.dismissAllModals();
      }, 300);
    });

    const mergeOptions = (componentId: string, params?: any) => {
      return Navigation.mergeOptions(componentId, params);
    };

    const showOverlay = flow(function* (params: any) {
      yield withNavigationLoading(() => {
        Navigation.showOverlay(params);
      }, 500);
    });

    const dismissOverlay = (componentId: string) => {
      Navigation.dismissOverlay(componentId);
    };

    const setRoot = (params?: any) => {
      return Navigation.setRoot(params);
    };

    const setStackRoot = (componentId: string, params?: any) => {
      return Navigation.setStackRoot(componentId, params);
    };

    const start = () => {
      Navigation.setDefaultOptions({
        layout: {
          backgroundColor: "#fff",
          orientation: ["portrait"]
        },
        statusBar: {
          backgroundColor: "white",
          style: "dark"
        },
        topBar: topbars.emptyTopBar()
      });

      return Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: SCREEN_IDS.StartScreen
                }
              }
            ]
          }
        }
      });
    };

    return {
      dismissAllModals,
      dismissModal,
      dismissOverlay,
      mergeOptions,
      pop,
      popTo,
      push,
      setCurrentComponent,
      setRoot,
      setStackRoot,
      showModal,
      showOverlay,
      start
    };
  });

export type INavigator = typeof Navigator.Type;

export default Navigator;
