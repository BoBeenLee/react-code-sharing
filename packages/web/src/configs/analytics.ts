import GA, { EventArgs } from "react-ga";
import env from "src/configs/env";

export enum EventType {
  TEST = "TEST",
}

export enum CategoryType {
  TEST = "TEST"
}

export interface IPixelEvent {
  key: string;
  data: { [$key: string]: any };
}

export const URI_MAX_LENGTH = 20;

export const sendGAEvent = ({ action, category, label, value }: EventArgs) => {
  if (env.GA_KEY) {
    GA.event({
      action,
      category,
      label,
      value
    });
  }
};

export const sendGAPageview = (url: string) => {
  if (env.GA_KEY) {
    GA.pageview(url);
  }
};
