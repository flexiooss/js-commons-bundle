import {deepFreezeSeal} from '../__import__js-generator-helpers'
import {isNull, TypeCheck} from '../__import__assert'

export class CookieConfig {
  /**
   * @param {?Date} [expires=null]
   * @param {?Number} [maxAge=null]
   * @param {?string} [domain=null]
   * @param {?string} [path='/']
   * @param {boolean} [secure=true]
   * @param {string} [samesite='strict']
   */
  constructor(expires = null, maxAge = null, domain = null, path = '/', secure = true, samesite = 'strict') {

    /**
     * @type {?Date}
     * @private
     */
    this.__expires = (!isNull(expires)) ? TypeCheck.assertIsDate(expires) : expires
    /**
     * @type {?Number}
     * @private
     */
    this.__maxAge = (!isNull(maxAge)) ? TypeCheck.assertIsNumber(maxAge) : maxAge
    /**
     * @type {?string}
     * @private
     */
    this.__domain = (!isNull(domain)) ? TypeCheck.assertIsString(domain) : domain
    /**
     * @type {?string}
     * @private
     */
    this.__path = (!isNull(path)) ? TypeCheck.assertIsString(path) : path

    /**
     * @type {boolean}
     * @private
     */
    this.__secure = TypeCheck.assertIsBoolean(secure)
    /**
     * @type {string}
     * @description lax or strict
     * @private
     */
    this.__samesite = TypeCheck.assertIsString(samesite)
    deepFreezeSeal(this)
  }

  /**
   * @return {?Date}
   */
  expires() {
    return this.__expires
  }

  /**
   * @return {?Number}
   */
  maxAge() {
    return this.__maxAge
  }

  /**
   * @return {?string}
   */
  domain() {
    return this.__domain
  }

  /**
   * @return {?string}
   */
  path() {
    return this.__path
  }


  /**
   * @return {boolean}
   */
  secure() {
    return this.__secure
  }

  /**
   * @return {string}
   */
  samesite() {
    return this.__samesite
  }
}

