import { YellowBox } from "react-native";

const ignoreWarning = () => {
  YellowBox.ignoreWarnings([
    "Require cycle:",
    "ListView is deprecated",
    'unknown call: "relay:check"'
  ]);
};

export { ignoreWarning };
