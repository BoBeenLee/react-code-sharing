import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";

import {
  Bold8,
  Bold10,
  Bold12,
  Bold13,
  Bold14
} from "@shared/components/text/Typographies";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

storiesOf("Text", module).add("Typographies", () => (
  <Container>
    <Bold8>Bold8</Bold8>
    <Bold10>Bold10</Bold10>
    <Bold12>Bold12</Bold12>
    <Bold13>Bold13</Bold13>
    <Bold14>Bold14</Bold14>
  </Container>
));
