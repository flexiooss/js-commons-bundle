import {isNull, assertType} from './__import__assert.js'
import {DocumentCookieHandler} from './cookie/DocumentCookieHandler.js'
import {CookieStorageConfig} from './CookieStorageConfig.js'

/**
 * @implements {Storage}
 */
export class CookieStorage {
  /**
   * @param {CookieStorageConfig} config
   */
  constructor(config) {
    assertType(config instanceof CookieStorageConfig, '`config` should be `CookieStorageConfig`')
    /**
     * @type {CookieStorageConfig}
     * @private
     */
    this.__config = config
    /**
     * @type {DocumentCookieHandler}
     * @private
     */
    this.__documentCookieHandler = new DocumentCookieHandler(this.__config)
  }

  /**
   * @return {number}
   */
  get length() {
    throw new Error('not implemented yet')
  }

  /**
   * @param {number} n
   * @return {?string}
   */
  key(n) {
    throw new Error('not implemented yet')
  }

  /**
   * @param key
   * @return {?string}
   */
  getItem(key) {
    return this.__documentCookieHandler.value(key)
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    this.__documentCookieHandler.write(key, value)
  }

  removeItem(key) {
    this.__documentCookieHandler.remove(key)
  }

  clear() {
    if (!isNull(this.__config.namespace())) {
      this.__documentCookieHandler.cleanByNamespace()
    }
  }
}
