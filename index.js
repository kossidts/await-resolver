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

resolver.sleep = ms => resolver(null, ms);

module.exports = resolver;
