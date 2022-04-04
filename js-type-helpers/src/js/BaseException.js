import {isArrowFunction, isFunction, TypeCheck} from '../../../assert'

export class BaseException extends Error {
  /**
   * @type {?number}
   */
  #code
  /**
   * @type {Date}
   */
  #date

  /**
   * @param {?string|function():string} [message=null]
   * @param {?number} [code=null]
   * @param params
   */
  constructor(message = null, code = null, ...params) {
    super(...params)
    if(isArrowFunction(message)){
      message = message.call(null)
    }
    this.message = TypeCheck.assertIsStringOrNull(message) || ''
    this.name = this.constructor.name
    this.#code = TypeCheck.assertIsNumberOrNull(code)
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
   * @return {Date}
   */
  date(){
    return this.#date
  }

  /**
   * @return {string}
   */
  toString() {
    return ` ${this.realName()} --- ${this.message} `
  }

  /**
   * @abstract
   * @return {string}
   */
  realName() {
    throw new Error('realName() should be override at:' + this.name)
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
      date: this.date(),
      code: this.code(),
      realName: this.realName(),
      name: this.name,
      message: this.toString(),
      trace: this.getTrace()
    }
  }
}