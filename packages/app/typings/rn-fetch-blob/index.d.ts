declare module "rn-fetch-blob" {
  function fetch(...args: any[]): any;
  function wrap(path): any;

  export default {
    fetch,
    fs,
    wrap
  };
}
