import { storiesOf } from "@storybook/react-native";
import _ from "lodash";
import React from "react";
import styled from "styled-components/native";

import { colors } from "../../src/styles";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BoxView = styled.View.attrs<{ color: string }>({})`
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color};
`;

const BGView = styled.View`
  flex-wrap: wrap;
`;

storiesOf("Color", module)
  .addDecorator((getStory: any) => <Container>{getStory()}</Container>)
  .add("with Color Palette", () => (
    <BGView>
      {_.map(colors, (color, index) => {
        return <BoxView key={`${color}${index}`} color={color} />;
      })}
    </BGView>
  ));
