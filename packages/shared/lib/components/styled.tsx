import React, { Component } from "react";
import { ThemedStyledInterface, ThemedCssFunction } from "styled-components";
import { ReactNativeStyledInterface } from "styled-components/native";

export const drawStyled = <P, S>(
  styled: ThemedStyledInterface<any> | ReactNativeStyledInterface<any>,
  css: ThemedCssFunction<any>
) => {
  return (props: P) => React.Component;
};
