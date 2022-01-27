import {assertInstanceOf, isNull, TypeCheck} from '../../../assert'
import {HotLogLevel} from "./HotLogLevel";

export class Log {
  /**
   * @type {Date}
   */
  #date = new Date()
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

  constructor(emitter, level, message, context) {
    this.#emitter = TypeCheck.assertIsString(emitter);
    this.#level = assertInstanceOf(level, HotLogLevel, 'HotLogLevel');
    this.#message = TypeCheck.assertIsString(message);
    this.#context = TypeCheck.assertIsObjectOrNull(context);
  }

  /**
   * @return {Date}
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