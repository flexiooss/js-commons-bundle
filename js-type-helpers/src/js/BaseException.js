import {TypeCheck} from '../../../assert'

export class BaseException extends Error {
  /**
   * @type {string}
   */
  #message
  /**
   * @type {?number}
   */
  #code
  /**
   * @type {string}
   */
  #name
  /**
   * @type {Date}
   */
  #date

  /**
   * @param {string} [message='']
   * @param {?number} [code=null]
   * @param params
   */
  constructor(message = '', code = null, ...params) {
    super(...params)
    this.#message = TypeCheck.assertIsString(message)
    this.#code = TypeCheck.assertIsNumberOrNull(code)
    this.#name = this.constructor.name
    this.#date = new Date()
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack || '';
    }
  }

  /**
   * @return {?number}
   */
  code() {
    return this.#code
  }

  /**
   * @return {string}
   */
  message() {
    return this.#message
  }

  /**
   * @return {string}
   */
  toString() {
    return ` ${this.realName()} --- ${this.#message} `
  }

  /**
   * @abstract
   * @return {string}
   */
  realName() {
    throw new Error('realName() should be override at:' + this.#name)
  }

  /**
   * @return {string}
   */
  getTrace() {
    return ('stack' in this) ? this.stack : ''
  }

  /**
   * @return {{date, realName: string, trace: string, name: string, message: string}}
   */
  toJSON() {
    return {
      date: this.#date,
      code: this.#code,
      realName: this.realName(),
      name: this.#name,
      message: this.toString(),
      trace: this.getTrace()
    }
  }
}