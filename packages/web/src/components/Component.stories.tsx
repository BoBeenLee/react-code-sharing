import { storiesOf } from "@storybook/react";
import React from "react";

import Footer from "src/components/Footer";
import Header from "src/components/Header";

storiesOf("Component", module)
  .add("Header", () => <Header />)
  .add("Footer", () => <Footer />);
