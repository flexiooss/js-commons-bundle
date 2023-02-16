import {assertInstanceOf, isFunction, TypeCheck} from '../../../assert/index.js'
import {HotLogLevel} from './HotLogLevel.js'
import {FlexDateTimeExtended} from '../../../extended-flex-types/index.js'

export class Log {
  /**
   * @type {FlexDateTime}
   */
  #date = FlexDateTimeExtended.now().toFlexDateTime()
  /**
   * @type {string}
   */
  #emitter
  /**
   * @type {string|function():string}
   */
  #message
  /**
   * @type {?Object|function():?Object}
   */
  #context = null
  /**
   * @type {HotLogLevel}
   */
  #level

  /**
   * @param {string} emitter
   * @param {HotLogLevel} level
   * @param {string|function():string} message
   * @param {?Object} context
   */
  constructor(emitter, level, message, context) {
    this.#emitter = TypeCheck.assertIsString(emitter)
    this.#level = assertInstanceOf(level, HotLogLevel, 'HotLogLevel')
    if(!isFunction(message)){
      TypeCheck.assertIsString(message)
    }
    this.#message = message
    if(!isFunction(context)){
      TypeCheck.assertIsObjectOrNull(context)
    }
    this.#context = context
  }

  /**
   * @return {FlexDateTime}
   */
  date() {
    return this.#date
  }

  /**
   * @return {string}
   */
  emitter() {
    return this.#emitter
  }

  /**
   * @return {HotLogLevel}
   */
  level() {
    return this.#level
  }

  /**
   * @return {string|function():string}
   */
  message() {
    return this.#message
  }

  /**
   * @return {?Object|function():?Object}
   */
  context() {
    return this.#context
  }
}
