import React from "react";
import styled from "styled-components";

import images from "@shared/images";
import { containerStyle } from "@shared/components/loading/ListLoading/style";

const Container = styled.div`
  flex-direction: row;
  flex: 1;
  height: 72px;
  padding-top: 12px;
  justify-content: center;
  align-content: center;
  ${containerStyle()}
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
