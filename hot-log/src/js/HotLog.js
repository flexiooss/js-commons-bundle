import {isNull} from '../../../assert'
import {TransporterHandler} from "./transporters/TransporterHandler";
import {HotLogLevel} from "./HotLogLevel";

export class HotLog {
  /**
   * @type {?HotLog}
   */
  static #instance = null
  /**
   * @type {TransporterHandler}
   */
  #transporters = new TransporterHandler()
  /**
   * @type {boolean}
   */
  #silent = true
  /**
   * @type {HotLogLevel}
   */
  #threshold = HotLogLevel.INFO

  /**
   * @return {HotLog}
   */
  static getHotLog() {
    if (isNull(HotLog.#instance)) {
      HotLog.#instance = new HotLog()
    }
    return HotLog.#instance
  }

  /**
   * @return {HotLog}
   */
  levelTrace() {
    this.#threshold = HotLogLevel.TRACE
    return this
  }

  /**
   * @return {HotLog}
   */
  levelDebug() {
    this.#threshold = HotLogLevel.DEBUG
    return this
  }

  /**
   * @return {HotLog}
   */
  levelInfo() {
    this.#threshold = HotLogLevel.INFO
    return this
  }

  /**
   * @return {HotLog}
   */
  levelWarn() {
    this.#threshold = HotLogLevel.WARN
    return this
  }

  /**
   * @return {HotLog}
   */
  levelError() {
    this.#threshold = HotLogLevel.ERROR
    return this
  }

  /**
   * @return {HotLog}
   */
  levelFatal() {
    this.#threshold = HotLogLevel.FATAL
    return this
  }

  threshold() {
    return this.#threshold
  }

  /**
   * @param {HotLogTransporter} transporter
   * @return {HotLog}
   */
  addTransporter(transporter) {
    this.#transporters.addTransporter(transporter)
    return this
  }

  /**
   * @return {boolean}
   */
  isSilentMode() {
    return this.#silent
  }

  /**
   * @return {HotLog}
   */
  disableSilentMode() {
    this.#silent = false
    return this
  }

  /**
   * @param {Log} log
   * @param {?HotLogLevel} threshold
   * @return {HotLog}
   */
  commit(log, threshold) {
    this.#transporters.commit(log, threshold)
    return this
  }
}