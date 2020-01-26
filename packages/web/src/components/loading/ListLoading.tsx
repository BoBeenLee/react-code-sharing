import React, { Component } from "react";
import styled from "styled-components";

import images from "@shared/images";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 72px;
  padding-top: 12px;
  justify-content: center;
  align-content: center;
`;

const LoadingView = styled.img`
  height: 20px;
  width: 20px;
`;

function ListLoading() {
  return (
    <Container>
      <LoadingView className="spin" alt="loading" src={images.listLoading} />
    </Container>
  );
}

export default ListLoading;
