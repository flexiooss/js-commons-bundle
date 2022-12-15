import {assertInstanceOf, isNull, TypeCheck} from '../../../assert'
import {Log} from "./Log";
import {HotLogLevel} from "./HotLogLevel";
import {HotLog} from "./HotLog";
import {TransporterHandler} from "./transporters/TransporterHandler";

export class Logger {
  /**
   * @type {string}
   */
  #name
  /**
   * @type {TransporterHandler}
   */
  #transporters = new TransporterHandler()
  /**
   * @type {?HotLogLevel}
   */
  #threshold = null

  /**
   * @private
   * @param {string} name
   */
  constructor(name) {
    this.#name = TypeCheck.assertIsString(name)
  }

  /**
   * @return {Logger}
   */
  levelTrace() {
    this.#threshold = HotLogLevel.TRACE
    return this
  }

  /**
   * @return {Logger}
   */
  levelDebug() {
    this.#threshold = HotLogLevel.DEBUG
    return this
  }

  /**
   * @return {Logger}
   */
  levelInfo() {
    this.#threshold = HotLogLevel.INFO
    return this
  }

  /**
   * @return {Logger}
   */
  levelWarn() {
    this.#threshold = HotLogLevel.WARN
    return this
  }

  /**
   * @return {Logger}
   */
  levelError() {
    this.#threshold = HotLogLevel.ERROR
    return this
  }

  /**
   * @return {Logger}
   */
  levelFatal() {
    this.#threshold = HotLogLevel.FATAL
    return this
  }

  /**
   * @param {string} name
   * @param {?string} [partialName=null]
   * @param {?string} [id=null]
   * @return {Logger}
   */
  static getLogger(name, partialName = null, id = null) {
    TypeCheck.assertIsString(name)
    TypeCheck.assertIsStringOrNull(partialName)
    TypeCheck.assertIsStringOrNull(id)
    name = `${name}${!isNull(partialName) ? ':' + partialName : ''}${!isNull(id) ? ':' + id : ''}`

    return new Logger(name)
  }

  /**
   * @param {HotLogTransporter} transporter
   * @return {Logger}
   */
  addTransporter(transporter) {
    this.#transporters.addTransporter(transporter)
    return this
  }

  /**
   * @param {HotLogLevel} level
   * @param {string} message
   * @param {Object} context=null
   * @return {Logger}
   */
  #commit(level, message, context) {
    try {
      /**
       * @type {Log}
       */
      const log = new Log(this.#name, level, message, context)
      if (this.#transporters.transporters().length) {
        this.#transporters.commit(log, this.#threshold)
      } else {
        HotLog.getHotLog().commit(log, this.#threshold)
      }
    } catch (e) {
      if (!HotLog.getHotLog().isSilentMode()) {
        throw e
      } else {
        console.error('LOGGING ERROR')
        console.error(e)
      }
    }

    return this
  }

  /**
   * @param {string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  trace(message, context = null) {
    // this.#commit(HotLogLevel.TRACE, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  debug(message, context = null) {
    // this.#commit(HotLogLevel.DEBUG, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  info(message, context = null) {
    // this.#commit(HotLogLevel.INFO, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  warn(message, context = null) {
    // this.#commit(HotLogLevel.WARN, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  error(message, context = null) {
    this.#commit(HotLogLevel.ERROR, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  fatal(message, context = null) {
    this.#commit(HotLogLevel.FATAL, message, context)
    return this
  }
}