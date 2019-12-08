interface IEnvironment {
  production: IEnvironmentEntry;
  staging: IEnvironmentEntry;
}

interface IEnvironmentEntry {
  FIREBASE_CONFIG?: any;
}

// tslint:disable:object-literal-sort-keys
const env: IEnvironment = {
  production: {
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyDdFJKoVQTL_EgUcy0BOQFaVGEk1fktPrU",
      authDomain: "myspace-c3805.firebaseapp.com",
      databaseURL: "https://myspace-c3805.firebaseio.com",
      projectId: "myspace-c3805",
      storageBucket: "myspace-c3805.appspot.com",
      messagingSenderId: "757274443049",
      appId: "1:757274443049:web:a76fa9da2b161d7385cb38"
    }
  },
  staging: {
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyDdFJKoVQTL_EgUcy0BOQFaVGEk1fktPrU",
      authDomain: "myspace-c3805.firebaseapp.com",
      databaseURL: "https://myspace-c3805.firebaseio.com",
      projectId: "myspace-c3805",
      storageBucket: "myspace-c3805.appspot.com",
      messagingSenderId: "757274443049",
      appId: "1:757274443049:web:a76fa9da2b161d7385cb38"
    }
  }
};

export const isProduction = () => process.env.GATSBY_ENV === "production";

export default env[process.env.GATSBY_ENV as keyof IEnvironment] || {};
