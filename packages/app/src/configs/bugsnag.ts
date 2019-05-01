import { Client } from "bugsnag-react-native";
import _ from "lodash";

import { ERROR_CODE } from "./error";

type BugsnagFunction<IProps, IStates> = (
  props: IProps,
  state: IStates,
  args
) => object | Promise<object>;

let bugsnag: Client | null = null;

const initBugsnag = () => {
  bugsnag = new Client("");
};

const getBugsnag = () => {
  return bugsnag;
};

const IGNORE_BUGSNAG_ERROR_CODE: string[] = [];

const IGNORE_BUGSNAG_ERROR_MESSAGE = [
  /^Network request failed$/,
  /^Response not successful: Received status code 403$/
];

const isIgnoreBugsnagErrorCode = (errorCode: string): boolean => {
  return IGNORE_BUGSNAG_ERROR_CODE.some(code => code === errorCode);
};

const isIgnoreBugsnagErrorMessage = (message: string): boolean => {
  return IGNORE_BUGSNAG_ERROR_MESSAGE.some(messageRegex =>
    messageRegex.test(message)
  );
};

const isIgnoreBugsnag = (error: any) => {
  const code = _.get(error, ["code"], "");
  const message = _.get(error, ["message"], "");
  return (
    isIgnoreBugsnagErrorCode(code) || isIgnoreBugsnagErrorMessage(message)
  );
};

function errorNotifyBugsnag(error: any, metadata?: object) {
  const code = _.get(error, ["code"], "");

  if (bugsnag && !isIgnoreBugsnag(error)) {
    bugsnag.notify(error, report => {
      report.metadata = {
        ErrorCode: code,
        ...(metadata || {})
      } as any;
    });
  }
}

function notifyBugsnag<IProps, IStates>(
  getMetadata: BugsnagFunction<IProps, IStates> = () => ({})
) {
  return (__, ___, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        return originalMethod.apply(this, args);
      } catch (error) {
        const metadata = await getMetadata(this.props, this.state, args);
        bugsnag!.notify(error, report => {
          report.metadata = metadata as any;
        });
      }
    };
    return descriptor;
  };
}

const withNotifyBugsnag = (metadata: object = {}) => (func: any) => async (
  ...args
) => {
  try {
    return await func(...args);
  } catch (error) {
    bugsnag!.notify(error, report => {
      report.metadata = metadata as any;
    });
  }
};

export {
  Client as BugsnagType,
  initBugsnag,
  isIgnoreBugsnagErrorCode,
  isIgnoreBugsnagErrorMessage,
  isIgnoreBugsnag,
  getBugsnag,
  errorNotifyBugsnag,
  notifyBugsnag,
  withNotifyBugsnag
};
