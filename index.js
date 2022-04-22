const resolver = arg => {
    if (arg instanceof Function) {
        arg = arg();
    }

    if (!(arg instanceof Promise)) {
        arg = new Promise((resolve, reject) => {
            if (arg instanceof Error) {
                reject(arg);
            }
            resolve(arg);
        });
    }
    return arg.then(result => [null, result]).catch(err => [err, null]);
};

module.exports = resolver;
