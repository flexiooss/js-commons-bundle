import {CookieStorage} from './CookieStorage.js'
import {CookieStorageConfig} from './CookieStorageConfig.js'
import {CookieConfig} from './cookie/CookieConfig.js'

export class CookieStorageBuilder {

  constructor() {
    /**
     * @type {?Document}
     * @private
     */
    this.__document = null
    /**
     * @type {?string}
     * @private
     */
    this.__namespace = null
    /**
     * @type {string}
     * @private
     */
    this.__cookieSizeSuffix = '__SIZE__'
    /**
     * @type {string}
     * @private
     */
    this.__cookieSizeSeparator = '__'
    /**
     * @type {string}
     * @private
     */
    this.__cookieNamespaceSeparator = '--'
    /**
     * @type {number}
     * @private
     */
    this.__chunkLength = 4000
    /**
     * @type {CookieConfig}
     * @private
     */
    this.__cookieConfig = new CookieConfig(null, 30 * 24 * 60 * 60)
  }

  /**
   * @param {?string} value
   * @return {CookieStorageBuilder}
   */
  namespace(value) {
    this.__namespace = value
    return this
  }

  /**
   * @param {string} value
   * @return {CookieStorageBuilder}
   */
  cookieSizeSuffix(value) {
    this.__cookieSizeSuffix = value
    return this
  }

  /**
   * @param {string} value
   * @return {CookieStorageBuilder}
   */
  cookieSizeSeparator(value) {
    this.__cookieSizeSeparator = value
    return this
  }

  /**
   * @param {string} value
   * @return {CookieStorageBuilder}
   */
  cookieNamespaceSeparator(value) {
    this.__cookieNamespaceSeparator = value
    return this
  }

  /**
   * @param {Number} value
   * @return {CookieStorageBuilder}
   */
  chunkLength(value) {
    this.__chunkLength = value
    return this
  }

  /**
   * @param {Document} value
   * @return {CookieStorageBuilder}
   */
  document(value) {
    this.__document = value
    return this
  }

  /**
   * @type {CookieConfig}
   * @return {CookieStorageBuilder}
   */
  cookieConfig(value) {
    this.__cookieConfig = value
    return this
  }

  /**
   * @return {CookieStorage}
   */
  build() {
    return new CookieStorage(
      new CookieStorageConfig(
        this.__document,
        this.__namespace,
        this.__cookieSizeSuffix,
        this.__cookieSizeSeparator,
        this.__cookieNamespaceSeparator,
        this.__chunkLength,
        this.__cookieConfig
      )
    )
  }
}
