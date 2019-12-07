interface IEnvironment {
  production: IEnvironmentEntry;
  staging: IEnvironmentEntry;
}

interface IEnvironmentEntry {
  GA_KEY?: string;
}

// tslint:disable:object-literal-sort-keys
const env: IEnvironment = {
  production: {
    GA_KEY: ""
  },
  staging: {
    GA_KEY: ""
  }
};

export const isProduction = () => process.env.GATSBY_ENV === "production";

export default env[process.env.GATSBY_ENV as keyof IEnvironment] || {};
