import _ from "lodash";
import * as config from "../../config.json";

interface IEnvironment {
  production: IEnvironmentEntry;
  development: IEnvironmentEntry;
  staging: IEnvironmentEntry;
  storybook: IEnvironmentEntry;
}

interface IEnvironmentEntry {
  REACT_ENV: string;
  GA_KEY?: string;
}

const REACT_ENV = _.defaultTo((config as any).REACT_ENV, "staging") as keyof IEnvironment;

// tslint:disable:object-literal-sort-keys
const env: IEnvironment = {
  development: {
    REACT_ENV,
    GA_KEY: "GA_KEY"
  },
  production: {
    REACT_ENV,
    GA_KEY: "GA_KEY"
  },
  staging: {
    REACT_ENV,
    GA_KEY: "GA_KEY"
  },
  storybook: {
    REACT_ENV,
    GA_KEY: "GA_KEY"
  }
};

export const isStorybook = () => REACT_ENV === "storybook";

export default env[REACT_ENV] || {};