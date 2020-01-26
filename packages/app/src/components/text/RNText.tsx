import React from "react";
import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

import styledRNText, {
  ITextProps
} from "@shared/components/text/RNText/RNText.app";

export interface IProps extends TextProps, ITextProps {}
export default styledRNText<IProps>(styled);
