import { createApolloFetch } from "apollo-fetch";

import env from "src/configs/env";

const url = env.API_URL;
const apolloFetch = createApolloFetch({ uri: url });

apolloFetch.use(({ options }, next) => {
  if (!options.headers) {
    options.headers = {
      "Content-Type": "application/json"
    };
  }
  options.headers = {
    ...options.headers,
  };
  next();
});

type FetchType = (query: string, variables?: object) => Promise<any>;

const fetch: FetchType = async (query: string, variables?: object) => {
  try {
    const rawResponse = await apolloFetch({ query, variables });
    const response = rawResponse.data;
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export default fetch;

