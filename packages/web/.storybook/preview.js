import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css");
  
  *, html, body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    word-break: keep-all;
    flex-direction: column;
  }

  html, body, #root {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
  }

  #root * {
    display: flex;
  }

  input {
    border-width: 0px;
    background-color: transparent;
  }
`;

export const decorators = [
  withKnobs,
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
];
