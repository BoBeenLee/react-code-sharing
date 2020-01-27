import _ from "lodash";

import { isJSON } from "@shared/utils/common";

type RemoteConfigType = "test";

export function remoteConfigFactory(
  getStringValue: (key: string) => Promise<string>,
  getBooleanValue: (key: string) => Promise<boolean>
) {
  const getStringValueWithDefault = async (
    key: RemoteConfigType,
    defaultValue: string
  ) => {
    try {
      const value = await getStringValue(key);
      return !_.isEmpty(value) ? value : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  const getBooleanValueWithDefault = async (
    key: RemoteConfigType,
    defaultValue: boolean
  ) => {
    try {
      return await getBooleanValue(key);
    } catch (error) {
      return defaultValue;
    }
  };

  const getJSONValueWithDefault = async <T>(
    key: RemoteConfigType,
    defaultValue: T
  ) => {
    const val = await getStringValue(key);

    if (!isJSON(val)) {
      return defaultValue;
    }
    try {
      return JSON.parse(val) as T;
    } catch (error) {
      // NOTHING
    }
    return defaultValue;
  };

  return {
    getStringValue: getStringValueWithDefault,
    getBooleanValue: getBooleanValueWithDefault,
    getJSONValue: getJSONValueWithDefault,
    test: () => getStringValueWithDefault("test", "")
  };
}
