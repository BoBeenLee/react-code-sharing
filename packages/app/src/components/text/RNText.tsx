import React from "react";
import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

import RNTextApp, {
  ITextProps
} from "@shared/components/text/RNText/RNTextApp";

export interface IProps extends TextProps, ITextProps {}
export default RNTextApp;
