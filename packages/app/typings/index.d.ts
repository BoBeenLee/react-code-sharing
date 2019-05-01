/* tslint:disable:interface-name */
declare module "*.json" {
  const value: any;
  export default value;
}

type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type RetrieveAsyncFunc<T> = ReturnType<T> extends Promise<infer U> ? U : never;
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type RemoveKeys<T, K extends Array<keyof T>> = Pick<
  T,
  Exclude<keyof T, K[keyof K]>
>;
