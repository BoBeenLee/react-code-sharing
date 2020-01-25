import React from "react";
import { ThemedCssFunction } from "styled-components";
import { ReactNativeStyledInterface } from "styled-components/native";

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

const styledRNText = <IProps extends ITextProps>(
  styled: ReactNativeStyledInterface<any>,
  css: ThemedCssFunction<any>
) => {
  const Text = styled.Text<{ fontType: FontType }>`
    font-family: ${({ fontType }) => fontTypeToFont[fontType]};
    letter-spacing: -0.5px;
    color: ${colors.gray900};
    include-font-padding: false;
  `;

  return function RNText({ fontType = "REGULAR", ...props }: IProps) {
    return <Text fontType={fontType} {...props} />;
  };
};

export default styledRNText;
