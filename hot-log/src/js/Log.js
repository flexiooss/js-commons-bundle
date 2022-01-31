import {assertInstanceOf, isNull, TypeCheck} from '../../../assert'
import {HotLogLevel} from "./HotLogLevel";
import {DateExtended} from '../../../extended-flex-types'

export class Log {
  /**
   * @type {FlexDateTime}
   */
  #date = new DateExtended().toUTCFlexDateTime()
  /**
   * @type {string}
   */
  #emitter
  /**
   * @type {string}
   */
  #message
  /**
   * @type {?Object}
   */
  #context = null
  /**
   * @type {HotLogLevel}
   */
  #level

  /**
   * @param {string} emitter
   * @param {HotLogLevel} level
   * @param {string} message
   * @param {?Object} context
   */
  constructor(emitter, level, message, context) {
    this.#emitter = TypeCheck.assertIsString(emitter);
    this.#level = assertInstanceOf(level, HotLogLevel, 'HotLogLevel');
    this.#message = TypeCheck.assertIsString(message);
    this.#context = TypeCheck.assertIsObjectOrNull(context);
  }

  /**
   * @return {FlexDateTime}
   */
  date() {
    return this.#date;
  }

  /**
   * @return {string}
   */
  emitter() {
    return this.#emitter;
  }

  /**
   * @return {HotLogLevel}
   */
  level() {
    return this.#level;
  }

  /**
   * @return {string}
   */
  message() {
    return this.#message;
  }

  /**
   * @return {?Object}
   */
  context() {
    return this.#context;
  }
}