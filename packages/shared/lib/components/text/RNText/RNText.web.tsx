import React from "react";
import styled from "styled-components";

import colors from "@shared/styles/colors";

const Container = styled.span`
  font-family: "NanumSquare", sans-serif;
  letter-spacing: -0.5px;
  color: ${colors.gray900};
`;

function RNText(props: any) {
  return <Container {...props} />;
}

export default RNText;
