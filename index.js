/**
 * @template T
 * @typedef {[Error | null, T | null]} ResolverResult
 */

/**
 * @template T
 * @typedef {T | PromiseLike<T> | ((...args: any[]) => T | PromiseLike<T>)} ResolverInput
 */

/**
 * Resolves a value, function, or promise with optional timeout and parameters
 *
 * @template T
 * @param {ResolverInput<T>} item - The value, promise or function to resolve
 * @param {number | null} [timeout] - Optional timeout in milliseconds
 * @param {...any} params - Optional parameters to pass to the function
 * @returns {Promise<ResolverResult<T>>} Returns a promise that resolves to [error, result]
 */
const resolver = (item, timeout, ...params) => {
    if (typeof timeout != "number" || timeout < 0) {
        timeout = null;
    }

    if (item instanceof Promise && timeout == null) {
        return item.then(result => [null, result]).catch(err => [err, null]);
    }

    let promisedItem = new Promise((resolve, reject) => {
        if (timeout == null) {
            if (item instanceof Function) {
                item = item.apply(null, params);
            }

            if (item instanceof Error) {
                reject(item);
            }
            resolve(item);
        } else {
            /**
             * A promise will reject in the current event loop
             * whereas setTimeout schedules the callback to execute (at the end of the next tick)
             * after a minimum threshold in ms has elapsed
             * So a catch should be added in this event loop to prevent UnhandledPromiseRejection
             */
            if (item instanceof Promise) {
                item.catch(reason => {
                    setTimeout(() => {
                        reject(reason);
                    }, timeout);
                });
            }

            setTimeout(() => {
                if (item instanceof Function) {
                    item = item.apply(null, params);
                }

                if (item instanceof Error) {
                    reject(item);
                }

                if (item instanceof Promise) {
                    item.then(resolve).catch(reject);
                } else {
                    resolve(item);
                }
            }, timeout);
        }
    });

    return promisedItem.then(result => [null, result]).catch(err => [err, null]);
};

/**
 * Delays execution for the specified number of milliseconds
 *
 * @param {number} ms - The number of milliseconds to sleep
 * @returns {Promise<[Error|null, undefined]>} A promise that resolves after the specified delay
 */
resolver.sleep = ms => resolver(null, ms);

module.exports = resolver;
