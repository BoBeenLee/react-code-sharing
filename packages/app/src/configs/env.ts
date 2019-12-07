import _ from "lodash";
import * as config from "../../config.json";

type EnvType = "production" | "staging" | "storybook";

enum Env {
  PRODUCTION = "production",
  STAGING = "staging",
  STORYBOOK = "storybook"
}

interface IEnvProps {
  apiURL: string;
  authURL: string;
  fetchHeaders: object;
  applicationAccessToken: string;
}

interface IAwsProps {
  accessKeyId: string;
  region: string;
  secretAccessKey: string;
}

interface IAppsFlyer {
  appId: string;
  devKey: string;
}

class Environment {
  public fetch: Map<EnvType, IEnvProps>;
  public aws: Map<EnvType, IAwsProps>;
  public env: Env = Env.STAGING;
  public postCodeServiceUri: string;
  public bubbleFilterServiceUri: string;
  public appsFlyer: IAppsFlyer;

  constructor() {
    this.fetch = new Map();
    this.aws = new Map();

    const reactEnv = _.defaultTo((config as any).REACT_ENV, Env.STAGING);
    const isProduction = !__DEV__ || reactEnv === Env.PRODUCTION;
    const isStaging = __DEV__ && reactEnv === Env.STAGING;
    const isStorybook = __DEV__ && reactEnv === Env.STORYBOOK;
    if (isProduction) {
      this.env = Env.PRODUCTION;
    } else if (isStaging) {
      this.env = Env.STAGING;
    } else if (isStorybook) {
      this.env = Env.STORYBOOK;
    }
    this.appsFlyer = {
      appId: "1466041001",
      devKey: "PcNeSqwHdKctrFzCHtdikU"
    };
    this.postCodeServiceUri = "https://dev-image.fitsme.kr/";
    this.bubbleFilterServiceUri = "https://staging-tag.fitsme.kr/";
    this.initFetch();
    this.initAWS();
  }

  public initFetch() {
    const apiURL = "https://staging-graph.fitsme.kr/graphql";
    const authURL = "https://dev-auth.fitsme.kr/graphql";
    const applicationAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEuMC4wIiwic2NvcGUiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTU1NzkxMDM3NywiaXNzIjoiYmxlbmRlZCJ9.y5LEfaEcsluDtj_yJlMqU9hlyvkkzLsQ5w1X4_zfg2s";
    const fetchHeaders = {};

    this.fetch
      .set(Env.PRODUCTION, {
        apiURL: "https://graph.fitsme.kr/graphql",
        applicationAccessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEuMC4wIiwic2NvcGUiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTU1ODY4MzM3MSwiaXNzIjoiYmxlbmRlZCJ9.7z8pwG5NtKBDfVXOB-aX-l89xB47cRkVEKwqy5t4GTM",
        authURL: "https://auth.fitsme.kr/graphql",
        fetchHeaders
      })
      .set(Env.STAGING, {
        apiURL,
        applicationAccessToken,
        authURL,
        fetchHeaders
      })
      .set(Env.STORYBOOK, {
        apiURL,
        applicationAccessToken,
        authURL,
        fetchHeaders
      });
  }

  public initAWS() {
    const region = "ap-northeast-2";

    this.aws
      .set(Env.PRODUCTION, {
        accessKeyId: "AKIAUCEYJ67F5I7PDDI5",
        region,
        secretAccessKey: "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"
      })
      .set(Env.STAGING, {
        accessKeyId: "AKIARDUNP335FWT2SVFT",
        region,
        secretAccessKey: "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"
      })
      .set(Env.STORYBOOK, {
        accessKeyId: "AKIARDUNP335FWT2SVFT",
        region,
        secretAccessKey: "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"
      });
  }

  public get daumPostCodeServiceUri() {
    return this.postCodeServiceUri;
  }
  
  public get visBubbleFilterServiceUri() {
    return this.bubbleFilterServiceUri;
  }

  public get fetchOptions() {
    return this.fetch.get(this.env as EnvType);
  }

  public get awsOptions() {
    return this.aws.get(this.env as EnvType);
  }

  public get isProduction() {
    return this.env === Env.PRODUCTION;
  }

  public get isStaging() {
    return this.env === Env.STAGING;
  }

  public get isStorybook() {
    return this.env === Env.STORYBOOK;
  }

  public get isDev() {
    return __DEV__;
  }

  public get imageURL() {
    return this.isProduction
      ? "https://img.fitsme.kr"
      : "https://staging-img.fitsme.kr";
  }
}

export default new Environment();
