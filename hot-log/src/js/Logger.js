import {assertInstanceOf, isNull, TypeCheck} from '../../../assert/index.js'
import {Log} from "./Log.js";
import {HotLogLevel, HotLogLevelHelper} from "./HotLogLevel.js";
import {HotLog} from "./HotLog.js";
import {TransporterHandler} from "./transporters/TransporterHandler.js";

export class LoggerBuilder {
  /**
   * @type {?LoggerBuilder}
   */
  static #instance = null
  /**
   * @type {boolean}
   */
  #transporters = true
  /**
   * @type {?HotLogLevel}
   */
  #threshold = null

  /**
   * @return {LoggerBuilder}
   */
  static getInstance() {
    if (isNull(this.#instance)) {
      this.#instance = new LoggerBuilder()
    }
    return this.#instance
  }

  /**
   * @return {LoggerBuilder}
   */
  withoutTransporter() {
    this.#transporters = false
    return this
  }

  /**
   * @return {LoggerBuilder}
   */
  withHotLogLevel() {
    this.#threshold = HotLog.getHotLog().threshold()
    return this
  }

  /**
   * @param {Logger} logger
   * @return {Logger}
   */
  build(logger) {
    assertInstanceOf(logger, Logger, 'Logger')
    if (!this.#transporters) {
      logger.addTransporter = () => logger
    }
    if (!isNull(this.#threshold)) {
      if (HotLogLevelHelper.lt(HotLogLevel.TRACE, this.#threshold)) {
        logger.trace = () => logger
      }
      if (HotLogLevelHelper.lt(HotLogLevel.DEBUG, this.#threshold)) {
        logger.debug = () => logger
      }
      if (HotLogLevelHelper.lt(HotLogLevel.INFO, this.#threshold)) {
        logger.info = () => logger
      }
      if (HotLogLevelHelper.lt(HotLogLevel.WARN, this.#threshold)) {
        logger.warn = () => logger
      }
      if (HotLogLevelHelper.lt(HotLogLevel.ERROR, this.#threshold)) {
        logger.error = () => logger
      }
      if (HotLogLevelHelper.lt(HotLogLevel.FATAL, this.#threshold)) {
        logger.fatal = () => logger
      }
    }

    return logger
  }

}

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

    return LoggerBuilder.getInstance().build(new Logger(name))
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
    this.#commit(HotLogLevel.TRACE, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  debug(message, context = null) {
    this.#commit(HotLogLevel.DEBUG, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  info(message, context = null) {
    this.#commit(HotLogLevel.INFO, message, context)
    return this
  }

  /**
   * @param {string|function():string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  warn(message, context = null) {
    this.#commit(HotLogLevel.WARN, message, context)
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