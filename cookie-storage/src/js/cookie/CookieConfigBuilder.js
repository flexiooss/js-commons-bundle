import {CookieConfig} from './CookieConfig.js'

export class CookieConfigBuilder {
  constructor() {

    /**
     * @type {?Date}
     * @private
     */
    this.__expires = null
    /**
     * @type {?Number}
     * @private
     */
    this.__maxAge = null
    /**
     * @type {?string}
     * @private
     */
    this.__domain = null
    /**
     * @type {?string}
     * @private
     */
    this.__path = null
    /**
     * @type {?boolean}
     * @private
     */
    this.__secure = null
    /**
     * @type {?string}
     * @description lax or strict
     * @private
     */
    this.__samesite = null
  }

  /**
   * @param {?Date} value
   * @return {CookieBuilder}
   */
  expires(value) {
    this.__expires = value
    return this
  }

  /**
   * @param {?Number} value
   * @return {CookieBuilder}
   */
  maxAge(value) {
    this.__maxAge = value
    return this
  }

  /**
   * @param {?string} value
   * @return {CookieBuilder}
   */
  domain(value) {
    this.__domain = value
    return this
  }

  /**
   * @param {?string} value
   * @return {CookieBuilder}
   */
  path(value) {
    this.__path = value
    return this
  }


  /**
   * @param {boolean} value
   * @return {CookieBuilder}
   */
  secure(value) {
    this.__secure = value
    return this
  }

  /**
   * @param {?string} value
   * @return {CookieBuilder}
   */
  samesite(value) {
    this.__samesite = value
    return this
  }

  /**
   * @return {CookieConfig}
   */
  build() {
    return new CookieConfig(
      this.__expires,
      this.__maxAge,
      this.__domain,
      this.__path,
      this.__secure,
      this.__samesite
    )
  }
}
