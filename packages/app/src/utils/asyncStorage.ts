import _ from "lodash";
import { AsyncStorage } from "react-native";

// tslint:disable:object-literal-sort-keys
const FIELD = {
  FIREHOSE_LOGS: "firehose-logs",
  SESSION_ID: "sessionId",
  USER_ID: "userId",
  USER_ACCESS_TOKEN: "userAccessToken",
  USER_EXPIRY: "userExpiry",
  USER_REFRESH_TOKEN: "userRefreshToken",
  USER_STATE: "userState"
};

const setItem = (key: string, value: string) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiSet([[key, value]], errors => {
      if (_.isEmpty(errors)) {
        resolve(true);
        return;
      }
      reject(_.first(errors));
    });
  });
};

const getItem = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiGet([key], (errors, result) => {
      if (_.isEmpty(errors)) {
        resolve(_.get(_.first(result), ["1"], ""));
        return;
      }
      reject(_.first(errors));
    });
  });
};

const clear = () => {
  return AsyncStorage.clear();
};

export default { FIELD, clear, setItem, getItem };
