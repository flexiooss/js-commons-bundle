import {isNull, TypeCheck, assertType} from './__import__assert.js'
import {CookieConfig} from './cookie/CookieConfig.js'

export class CookieStorageConfig {

  /**
   * @param {Document} document
   * @param {?string} namespace
   * @param {string} cookieSizeSuffix
   * @param {string} cookieSizeSeparator
   * @param {string} cookieNamespaceSeparator
   * @param {Number} chunkLength
   * @param {CookieConfig} cookieConfig
   */
  constructor(document, namespace, cookieSizeSuffix, cookieSizeSeparator, cookieNamespaceSeparator, chunkLength, cookieConfig) {
    /**
     * @type {?string}
     * @private
     */
    this.__namespace = (!isNull(namespace)) ? TypeCheck.assertIsString(namespace) : namespace
    /**
     * @type {string}
     * @private
     */
    this.__cookieSizeSuffix = TypeCheck.assertIsString(cookieSizeSuffix)
    /**
     * @type {string}
     * @private
     */
    this.__cookieSizeSeparator = TypeCheck.assertIsString(cookieSizeSeparator)
    /**
     * @type {string}
     * @private
     */
    this.__cookieNamespaceSeparator = TypeCheck.assertIsString(cookieNamespaceSeparator)
    /**
     * @type {Document}
     * @private
     */
    this.__document = document
    /**
     * @type {Number}
     * @private
     */
    this.__chunkLength = TypeCheck.assertIsNumber(chunkLength)
    assertType(cookieConfig instanceof CookieConfig, '`cookieConfig` should be `CookieConfig`')
    /**
     * @type {CookieConfig}
     * @private
     */
    this.__cookieConfig = cookieConfig
  }


  /**
   * @return {?string}
   */
  namespace() {
    return this.__namespace
  }

  /**
   * @return {string}
   */
  cookieSizeSuffix() {
    return this.__cookieSizeSuffix
  }

  /**
   * @return {string}
   */
  cookieSizeSeparator() {
    return this.__cookieSizeSeparator
  }

  /**
   * @return {string}
   */
  cookieNamespaceSeparator() {
    return this.__cookieNamespaceSeparator
  }

  /**
   * @return {Document}
   */
  document() {
    return this.__document
  }

  /**
   * @return {Number}
   */
  chunkLength() {
    return this.__chunkLength
  }

  /**
   * @return {CookieConfig}
   */
  cookieConfig() {
    return this.__cookieConfig
  }
}
