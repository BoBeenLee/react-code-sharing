import React from "react";
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

function ListLoading() {
  const Loading = images.listLoading;
  return (
    <Container>
      <Loading width={40} height={40} />
    </Container>
  );
}

export default ListLoading;
