import { EventArgs } from "react-ga";

import { IPixelEvent, sendGAEvent, sendPixelEvent } from "src/configs/analytics";
import {
  createInjectDecorator,
  MakeData
} from "src/decorators/createInjectDecorator";

export function gaTracking<IProps, IStates>(
  getData: MakeData<IProps, IStates, EventArgs>
): any {
  const func = async (props: IProps, state: IStates, args: any[]) => {
    const data = await getData(props, state, args);
    sendGAEvent(data);
  };
  return createInjectDecorator(func);
}

export function pixelTracking<IProps, IStates>(
  getData: MakeData<IProps, IStates, IPixelEvent>
): any {
  const func = async (props: IProps, state: IStates, args: any[]) => {
    const { key, data } = await getData(props, state, args);
    sendPixelEvent(key, data);
  };

  return createInjectDecorator(func);
}
