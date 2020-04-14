import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import ListLoading from "@shared/components/loading/ListLoading";

storiesOf("Loading", module).add("ListLoading", () => {
  return <ListLoading />;
});
