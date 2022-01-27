import {isNull, TypeCheck} from '../../../assert'
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
   * @private
   * @param {string} fullName
   * @param {?string} partialName
   * @param {?string} id
   */
  constructor(fullName, partialName, id) {
    TypeCheck.assertIsString(fullName)
    TypeCheck.assertIsStringOrNull(partialName)
    TypeCheck.assertIsStringOrNull(id)
    this.#name = `${fullName}${!isNull(partialName) ? ':' + partialName : ''}${!isNull(id) ? ':' + id : ''}`
  }

  /**
   * @param {string} name
   * @param {?Object} [instance=null]
   * @param {?string} [id=null]
   * @return {Logger}
   */
  static getLogger(name, instance = null, id = null) {
    /**
     * @type {?string}
     */
    let partialName = null
    if (!isNull(instance)) {
      try {
        partialName = instance.constructor.name
      } catch {

      }
    }

    return new Logger(name, partialName, id)
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
    // try {
      /**
       * @type {Log}
       */
      const log = new Log(this.#name, level, message, context)
      if (this.#transporters.transporters().length) {
        this.#transporters.commit(log)
      } else {
        HotLog.getHotLog().commit(log)
      }
    // } catch (e) {
    //   console.error(e)
    // }

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
   * @param {string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  debug(message, context = null) {
    this.#commit(HotLogLevel.DEBUG, message, context)
    return this
  }

  /**
   * @param {string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  info(message, context = null) {
    this.#commit(HotLogLevel.INFO, message, context)
    return this
  }

  /**
   * @param {string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  warn(message, context = null) {
    this.#commit(HotLogLevel.WARN, message, context)
    return this
  }

  /**
   * @param {string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  error(message, context = null) {
    this.#commit(HotLogLevel.ERROR, message, context)
    return this
  }

  /**
   * @param {string} message
   * @param {Object} [context=null]
   * @return {Logger}
   */
  fatal(message, context = null) {
    this.#commit(HotLogLevel.FATAL, message, context)
    return this
  }
}