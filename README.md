# Await Resolver

[![License][license-image]][license-url] [![NPM Package Version][npm-image-version]][npm-url] ![GitHub top language][language-image] ![Size][size-image] ![Last Commit][commit-image] ![Workflow CI][workflow-image]

A simple to use (async await) wrapper to resolve functions, promises and more.

It provides a timeout functionalitiy to delay/timeout execution.

The resolver always returns an array of type `[error, result]` to ease error handling and eliminate the need to (try-)catch.

Syntax:

`await resolver(something)`

`await resolver(something, timeout)`

`await resolver(fn, timeout, fn_param1, fn_param2, ..., fn_paramN)`

Or as a promise

`resolver(something).then(([result, error]) => { ... })`

`resolver(something, timeout).then(([result, error]) => { ... })`

`resolver(fn, timeout, fn_param1, fn_param2, ..., fn_paramN).then(([result, error]) => { ... })`

## Installation

```bash
$ npm i await-resolver
```

## Usage

##### Require CommonJS (default)

```js
const resolver = require("await-resolver");
```

##### Import ES-Module (default)

```js
import resolver from "await-resolver";
```

##### Import ES-Module (named)

```js
import { resolver } from "await-resolver";
```

#### Await the resolver inside an async function

```js
async () => {
    let anything; // can be a function, a promise, an error, or any kind of value
    let [error, result] = await resolver(anything);

    // Use timeout to delay execution
    let timeout = 1500; // ms just like setTimeout

    // just sleep
    await resolver(null, timeout);

    // Resolve a function without arguments, with timeout
    let [error, result] = await resolver(my_function, timeout);

    // Resolve a function with arguments, without timeout
    let multiply = (a, b) => a * b;
    let [error, result] = await resolver(multiply, null, 4, 5); // => [null, 20]

    // Resolve a function with arguments, with timeout
    let [error, result] = await resolver(multiply, timeout, 4, 5); // => [null, 20] after timeout
};
```

#### Or use the resolver as a regular promise

```js
resolver(anything).then(([error, result]) => {
    if (error) {
        // do something
    } else {
        // do something else
    }
});

// sleep
resolver(null, timeout).then(([error, result]) => {
    // do something
});

let multiply = (a, b) => a * b;

resolver(multiply, timeout, 4, 5).then(([error, result]) => {
    // do something
});
```

## License

See [LICENSE][license-url].

## Copyright

Copyright &copy; 2022. Kossi D. T. Saka.

[npm-image-version]: https://img.shields.io/npm/v/await-resolver.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/await-resolver.svg?color=purple
[npm-url]: https://npmjs.org/package/await-resolver
[license-image]: https://img.shields.io/github/license/kossidts/await-resolver
[license-url]: https://github.com/kossidts/await-resolver/blob/master/LICENSE
[language-image]: https://img.shields.io/github/languages/top/kossidts/await-resolver?color=yellow
[size-image]: https://img.shields.io/github/repo-size/kossidts/await-resolver?color=light
[commit-image]: https://img.shields.io/github/last-commit/kossidts/await-resolver
[actions-url]: https://github.com/kossidts/await-resolver/actions
[workflow-image]: https://github.com/kossidts/await-resolver/actions/workflows/node.js.yml/badge.svg
[workflow-image-2]: https://github.com/kossidts/await-resolver/workflows/Node.js%20CI/badge.svg
