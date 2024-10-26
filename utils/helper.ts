import {type Nullable} from "./types";

export const debounce = (timeout: NodeJS.Timeout | null, fnc: () => void, delayMs?: number) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    fnc();
  }, delayMs || 500);
};

export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    delay = 16,
): ((...funcArgs: Parameters<T>) => void) => {
  let time: number;
  let called = false;
  let skippedCalls = 0;
  let trailingCall: Nullable<any> = null;
  return function (this: T /*, ..._args: Parameters<T>*/): void {
    if (!time) {
      time = Date.now();
    }
    if (!called || time + delay - Date.now() < 0) {
      func.apply(this, [...arguments]); // eslint-disable-line prefer-rest-params
      time = Date.now();
      called = true;
    } else {
      skippedCalls++;
    }
    if (!trailingCall) {
      trailingCall = setInterval(() => {
        if (skippedCalls) {
          func.apply(this, [...arguments]); // eslint-disable-line prefer-rest-params
        }
        skippedCalls = 0;
        clearInterval(trailingCall);
        trailingCall = null;
      }, delay);
    }
  };
};

export const formatPrice = (price: number): string => {
  return (Math.floor(price) / 100).toFixed(2).toString().replace('.', ',');
};
