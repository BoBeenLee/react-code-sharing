import React from "react";
import styled from "styled-components";

import { IProps } from "@shared/components/icon/XEIcon/interface";

const XEIcon = styled.i<{ size: number; color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
`;

const Icon = ({ name, color, size }: IProps) => (
  <XEIcon className={`xi-${name}`} color={color} size={size} />
);

export default Icon;
