# Await Resolver

[![License][license-image]][license-url] [![NPM Package Version][npm-image-version]][npm-url] ![GitHub top language][language-image] ![Size][size-image] ![Last Commit][commit-image]

A promise resolver that never throws. It always resolves with an array of type `[error, result]` and eliminates the need to catch as well as the usage of a try-catch block.

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

###### Await it in an async function (code block)

```js
let anything;
let [error, result] = await resolver(anything);
```

###### Or use it in the resolve block

```js
resolver(anything).then(([error, result]) => {
    if (error) {
        // do something
    } else {
        // do something else
    }
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
