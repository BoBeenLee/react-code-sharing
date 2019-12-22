import React, { SFC } from "react";
import { RegisteredStyle, ViewStyle } from "react-native";
import styled from "styled-components/native";

import colors from "src/styles/colors";
import { iosStatusBarHeight } from "src/utils/device";

interface IProps {
  children?: React.ReactNode;
  style?: RegisteredStyle<ViewStyle> | ViewStyle;
  statusBarColor?: string;
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding-top: ${iosStatusBarHeight(false)}px;
`;

const OutterContainer = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const ContainerWithStatusBar: SFC<IProps> = ({
  children,
  statusBarColor = "white",
  style
}) => {
  return (
    <OutterContainer backgroundColor={statusBarColor}>
      <Container style={style}>{children}</Container>
    </OutterContainer>
  );
};

export default ContainerWithStatusBar;
