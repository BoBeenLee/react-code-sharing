import _ from "lodash";

export const appendQueryParams = (
  uri: string,
  params: { [key: string]: string }
) => {
  if (_.isEmpty(uri)) {
    return "";
  }
  const keys = _.keys(params);
  return (
    uri + _.reduce(keys, (res, key) => `${res}&${key}=${params[key]}`, "?")
  );
};

export const extractFileExtension = (fileName: string) => {
  const regex = /\.[0-9a-z]+$/i;
  const matches = fileName.match(regex);

  if (_.isEmpty(matches)) {
    return null;
  }
  return _.slice((matches || "")[0], 1)
    .join("")
    .toUpperCase();
};

export const extractUrlByQueryParam = (name: string, uri: string) => {
  const match = RegExp("[?&]" + name + "=([^&]*)").exec(uri);
  return match && (match[1].replace(/\+/g, " ") || "").toUpperCase();
};
