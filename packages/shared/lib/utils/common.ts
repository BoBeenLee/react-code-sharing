import _ from "lodash";


interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}


export const identity = <T>(value?: T) => {
  return value;
};

export const omit: Omit = (obj, ...keys) => {
  let ret = {} as {
    [K in keyof typeof obj]: typeof obj[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export const enhanceNoError = (func: any) => async (...args: any[]) => {
  try {
    return await func(...args);
  } catch (error) {
    // NOTHING
  }
};

export function delay(seconds = 500) {
  return new Promise((resolve, __) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}

export function isJSON(str: string) {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === "object" && obj !== null) {
      return true;
    }
  } catch (err) {
    // NOTHING
  }
  return false;
}

export const getValue = <T>(func: () => T, defaultValue: T) => {
  try {
    return func();
  } catch (error) {
    return defaultValue;
  }
};

export const filterNull = <T>(iterable: Array<T | null> | null) => {
  if (!iterable) {
    return [];
  }
  return _.filter(iterable, i => i !== null) as T[];
};

export const filterEmpty = <T>(
  iterable: Array<T | null | undefined> | null | undefined
) => {
  if (!iterable) {
    return [];
  }
  return _.filter(
    iterable,
    i => i !== null && i !== undefined && (i as any) !== ""
  ) as T[];
};
