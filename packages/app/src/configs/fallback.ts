import { CMError } from "./error";

const withFallback = (proccessFallback: (error: CMError) => void) => {
  return func => async (...args) => {
    try {
      await func(...args);
    } catch (error) {
      proccessFallback(error);
    }
  };
};

function fallback(proccessFallback: (error: CMError) => void) {
  return function WithFallback(_: any, prop: string, descriptor?: any): any {
    let fn;
    let patchedFn;

    const isNormalFunction = !!descriptor.value;
    const isArrowFunction = !!descriptor.initializer;

    if (isNormalFunction) {
      fn = descriptor.value;
      return {
        configurable: true,
        enumerable: false,
        get() {
          if (!patchedFn) {
            patchedFn = async (...args) => {
              try {
                await fn.call(this, ...args);
              } catch (error) {
                proccessFallback(error);
              }
            };
          }
          return patchedFn;
        },
        set(newFn) {
          patchedFn = undefined;
          fn = newFn;
        }
      };
    }

    if (isArrowFunction) {
      function initializer(component: any) {
        return async (...args) => {
          try {
            await descriptor.initializer.call(component)(...args);
          } catch (error) {
            proccessFallback(error);
          }
        };
      }

      return {
        configurable: true,
        enumerable: false,
        initializer() {
          return (this[prop] = initializer(this));
        }
      };
    }

    return descriptor;
  };
}

export default fallback;
export { withFallback };
