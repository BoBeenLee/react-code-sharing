import React, { Component } from "react";
import styled from "styled-components/native";

import images from "@shared/images";

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  height: 72px;
  padding-top: 12px;
  justify-content: center;
  align-content: center;
`;

const LoadingView = styled.Image`
  height: 20px;
  width: 20px;
`;

function ListLoading() {
  return (
    <Container>
      <LoadingView source={images.listLoading} />
    </Container>
  );
}

export default ListLoading;
