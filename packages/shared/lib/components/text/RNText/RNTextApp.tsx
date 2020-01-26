import React, { useState } from "react";
import { ThemedCssFunction } from "styled-components";
import styled, { ReactNativeStyledInterface } from "styled-components/native";

import colors from "@shared/styles/colors";

export type FontType = "BOLD" | "MEDIUM" | "REGULAR";
export interface ITextProps {
  fontType?: FontType;
}

const fontTypeToFont: { [key in FontType]: string } = {
  BOLD: "NotoSansKR-Bold",
  MEDIUM: "NotoSansKR-Medium",
  REGULAR: "NotoSansKR-Regular"
};

const Container = styled.View``;

const Text = styled.Text<{ fontType: FontType }>`
  font-family: ${({ fontType }) => fontTypeToFont[fontType]};
  letter-spacing: -0.5px;
  color: ${colors.gray900};
  include-font-padding: false;
`;

function RNText1({ fontType = "REGULAR", ...props }: any) {
  const [counter, setCounter] = useState(0);
  return <Text fontType={fontType} {...props} />;
}

class RNText extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { counter: 0 };
  }
  public render() {
    const { fontType = "REGULAR", ...props } = this.props;
    return <Text fontType={fontType} {...props} />;
  }

  public increaseCount = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
}

export default RNText;
