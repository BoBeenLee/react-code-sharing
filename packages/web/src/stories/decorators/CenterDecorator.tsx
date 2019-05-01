import React from "react";
import styled from "styled-components";

const CenterView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const CenterDecorator = (storyFn: any) => (
  <CenterView>{storyFn()}</CenterView>
);
