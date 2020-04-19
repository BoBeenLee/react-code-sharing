import theme from "styled-theming";

import { defaultEmpty } from "@shared/utils/common";

export const fontEnHeebo = (props: object) =>
  defaultEmpty(
    theme("font", {
      en: "Heebo, Noto Sans KR, sans-serif",
      ko: "Noto Sans KR, Heebo, sans-serif"
    })(props),
    "Heebo, Noto Sans KR, sans-serif"
  );

export const fontEnRoboto = (props: object) =>
  defaultEmpty(
    theme("font", {
      en: "Roboto, Noto Sans KR, sans-serif",
      ko: "Noto Sans KR, Heebo, sans-serif"
    })(props),
    "Roboto, Noto Sans KR, sans-serif"
  );
