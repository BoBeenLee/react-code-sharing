import React from "react";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import xeiconSelection from "./selection.json";

import { IProps } from "@shared/components/icon/XEIcon/interface";

// http://xpressengine.github.io/XEIcon/library-2.3.3.html
const XEIcon = createIconSetFromIcoMoon(
  xeiconSelection,
  "xeicon",
  "xeicon.ttf"
);

const Icon = (props: IProps) => <XEIcon {...props} />;

export default Icon;
