/** @typedef {import('./index.js').ResolverResult<T>} ResolverResult<T> */
/** @typedef {import('./index.js').ResolverInput<T>} ResolverInput<T> */

/**
 * @template T
 * @param {ResolverInput<T>} item - The value, promise or function to resolve
 * @param {number | null} [timeout] - Optional timeout in milliseconds
 * @param {...any} params - Optional parameters to pass to the function
 * @returns {Promise<ResolverResult<T>>} Returns a promise that resolves to [error, result]
 */
export { default, default as resolver } from "./index.js";
