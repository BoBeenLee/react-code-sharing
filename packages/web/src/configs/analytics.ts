import Pixel from "react-facebook-pixel";
import GA, { EventArgs } from "react-ga";
import env from "src/configs/env";

export interface IPixelEvent {
  key: string;
  data: { [$key: string]: any };
}

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

export const sendPixelEvent = (key: string, data: { [key: string]: any }) => {
  if (env.PIXEL_KEY) {
    Pixel.trackCustom(key, data);
  }
};

export const sendPixelPageview = () => {
  if (env.PIXEL_KEY) {
    Pixel.pageView();
  }
};
