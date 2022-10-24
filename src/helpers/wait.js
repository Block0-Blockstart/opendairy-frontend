export const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

export const waitAndDo = (delay, fn) => new Promise(resolve => setTimeout(() => resolve(fn()), delay));
