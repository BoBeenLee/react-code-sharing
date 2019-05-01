import * as config from "../../config.json";

enum ENV_TYPE {
  production = "production",
  staging = "staging",
  storybook = "storybook",
  development = "development"
}

const REACT_ENV = ((config as any).REACT_ENV as ENV_TYPE) || "development";

interface IEnvProps {
  apiURL: string;
  fetchHeaders: object;
  applicationAccessToken: string;
}

// tslint:disable:object-literal-sort-keys
const envMap: { [key in ENV_TYPE]: IEnvProps } = {
  development: {
    apiURL: "https://example.com/graphql",
    fetchHeaders: {},
    applicationAccessToken: ""
  },
  staging: {
    apiURL: "https://example.com/graphql",
    fetchHeaders: {},
    applicationAccessToken: ""
  },
  storybook: {
    apiURL: "https://example.com/graphql",
    fetchHeaders: {},
    applicationAccessToken: ""
  },
  production: {
    apiURL: "https://example.com/graphql",
    fetchHeaders: {},
    applicationAccessToken: ""
  }
};

export const isProduction = () => REACT_ENV === "production";

export const isDevelopment = () => REACT_ENV === "development";

export const isStorybook = () => REACT_ENV === "storybook";


export default {
  ...envMap[REACT_ENV],
  isProduction,
  isDevelopment,
  isStorybook
};
