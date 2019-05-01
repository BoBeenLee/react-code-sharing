import Images from "assets-images";
import React, { SFC } from "react";
import {
  Image, RegisteredStyle, View,
  ViewStyle
} from "react-native";
import styled from "styled-components/native";


interface IProps {
  style?: RegisteredStyle<ViewStyle> | ViewStyle;
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-content: center;
`;

const ImageView = styled(Image)`
  width: 80px;
  height: 78px;
  align-self: center;
`;

const Splash: SFC<IProps> = ({ style }) => {
  return (
    <Container style={style}>
      <ImageView source={Images.splash} />
    </Container>
  );
};

export default Splash;
