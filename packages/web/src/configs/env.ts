type EnvironmentPropsByEnv = {
  production: EnvironmentProps;
  staging: EnvironmentProps;
};

interface EnvironmentProps {
  FIREBASE_CONFIG?: any;
  API_URL: string;
}

// tslint:disable:object-literal-sort-keys
const env: EnvironmentPropsByEnv = {
  production: {
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyDdFJKoVQTL_EgUcy0BOQFaVGEk1fktPrU",
      authDomain: "myspace-c3805.firebaseapp.com",
      databaseURL: "https://myspace-c3805.firebaseio.com",
      projectId: "myspace-c3805",
      storageBucket: "myspace-c3805.appspot.com",
      messagingSenderId: "757274443049",
      appId: "1:757274443049:web:ea967cb66d9dbf8f85cb38",
      measurementId: "G-3RXWEWDG32"
    },
    API_URL: ""
  },
  staging: {
    FIREBASE_CONFIG: {
      apiKey: "AIzaSyDdFJKoVQTL_EgUcy0BOQFaVGEk1fktPrU",
      authDomain: "myspace-c3805.firebaseapp.com",
      databaseURL: "https://myspace-c3805.firebaseio.com",
      projectId: "myspace-c3805",
      storageBucket: "myspace-c3805.appspot.com",
      messagingSenderId: "757274443049",
      appId: "1:757274443049:web:ea967cb66d9dbf8f85cb38",
      measurementId: "G-3RXWEWDG32"
    },
    API_URL: ""
  }
};

export const isDevelopment = () => process.env.GATSBY_ENV === "development";

export const isProduction = () => process.env.GATSBY_ENV === "production";

export default env[process.env.GATSBY_ENV as keyof EnvironmentPropsByEnv] || {};
