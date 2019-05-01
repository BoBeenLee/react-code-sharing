import { execute, makePromise } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import gql from "graphql-tag";
import _ from "lodash";

import { errorNotifyBugsnag } from "./bugsnag";
import env, { isDevelopment } from "./environment";
import { CMError } from "./error";

declare const fetch: (url: string, options?: object) => Promise<any>;

const apiURL = env.apiURL;

const fetchApiOptions: { token: string } = {
  token: env.applicationAccessToken
};

const setApiAccessToken = (token: string) => {
  fetchApiOptions.token = token;
};

const getApiAccessToken = () => {
  return fetchApiOptions.token;
};

const getApplicationAccessToken = () => {
  return env.applicationAccessToken;
};

const getParams = () => ({
  headers: {
    ...env.fetchHeaders,
    "Cache-Control": "proxy-revalidate"
  }
});

const makeHttpLink = (uri: string) => {
  return isDevelopment()
    ? createHttpLink({
      uri
    })
    : createPersistedQueryLink({
      useGETForHashedQueries: true
    }).concat(
      createHttpLink({
        uri
      })
    );
};

const apiLink = makeHttpLink(apiURL);

const cmFetch = async (
  query,
  variables,
  headers: object = {},
  link = apiLink
) => {
  const operationQuery = typeof query === "string" ? gql(query) : query;

  const context = { headers: { ...getParams().headers, ...headers } };

  const operation = {
    context,
    query: operationQuery,
    variables
  };

  try {
    return await makePromise(execute(link, operation)).then(response => {
      if (response.errors) {
        const errorResponse = _.first(response.errors);
        const code = _.get(
          errorResponse,
          ["extensions", "exception", "code"],
          ""
        );
        const name = _.get(
          errorResponse,
          ["extensions", "exception", "name"],
          ""
        );
        const message = _.get(errorResponse, ["message"], "");
        throw new CMError(message, name, code);
      }
      return response;
    });
  } catch (error) {
    errorNotifyBugsnag(error, {
      GraphQL: { query, variables },
      Headers: getParams().headers
    });
    throw error;
  }
};

export type CMFetchType = (query: string, variables: object) => Promise<any>;

const apiFetch = (query, variables) =>
  cmFetch(query, variables, {
    "Graphql-Authorization": `${""}`
  });

export {
  apiFetch,
  setApiAccessToken,
  getApiAccessToken,
  getApplicationAccessToken,
  getParams,
  fetchApiOptions
};
