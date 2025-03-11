export = resolver;
/**
 * @template T
 * @typedef {[Error, null] | [null, T]} ResolverResult
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
 * @returns {Promise<[Error, null] | [null, T]>} Returns a promise that resolves to either [error, null] or [null, result]
 */
declare function resolver<T>(item: ResolverInput<T>, timeout?: number | null, ...params: any[]): Promise<[Error, null] | [null, T]>;
declare namespace resolver {
    export { sleep, ResolverResult, ResolverInput };
}
/**
 * Delays execution for the specified number of milliseconds
 *
 * @param {number} ms - The number of milliseconds to sleep
 * @returns {Promise<[Error | null, null]>} A promise that resolves after the specified delay
 */
declare function sleep(ms: number): Promise<[Error | null, null]>;
type ResolverResult<T> = [Error, null] | [null, T];
type ResolverInput<T> = T | PromiseLike<T> | ((...args: any[]) => T | PromiseLike<T>);
