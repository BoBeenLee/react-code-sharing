import { Navigation } from "react-native-navigation";

import env from "src/configs/env";
import { setupReactotron } from "./ReactotronConfig";
import App from "./src/App";
import Store from "./src/stores/Store";

async function start() {
    const store = Store.create();

    setupReactotron(store);

    Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                component: {
                    name: "navigation.playground.WelcomeScreen"
                }
            }
        });
    });
}

if (env.isStorybook) {
    // tslint:disable-next-line:no-var-requires
    const startStorybook = require("/storybook/storybook").default;
    startStorybook();
} else {
    start();
}
