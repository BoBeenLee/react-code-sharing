import { css } from "styled-components";
import { media } from "@shared/utils/media";

export const containerStyle = (width?: number) => css`
  flex-direction: row;
  flex: 1;
  height: 72px;
  padding-top: 12px;
  justify-content: center;
  align-content: center;
  ${media.mobile(width)`
    background-color: red;
  `}
`;
