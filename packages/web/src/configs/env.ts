interface IEnvironment {
  production: IEnvironmentEntry;
  development: IEnvironmentEntry;
  staging: IEnvironmentEntry;
}

interface IEnvironmentEntry {
  DB_ENV: string;
  GA_KEY?: string;
}

const DB_ENV = process.env.GATSBY_ENV === "production" ? "" : "_dev";

// tslint:disable:object-literal-sort-keys
const env: IEnvironment = {
  development: {
    DB_ENV,
    GA_KEY: "GA_KEY"
  },
  production: {
    DB_ENV,
    GA_KEY: "GA_KEY"
  },
  staging: {
    DB_ENV,
    GA_KEY: "GA_KEY"
  }
};

export default env[process.env.GATSBY_ENV as keyof IEnvironment] || {};
