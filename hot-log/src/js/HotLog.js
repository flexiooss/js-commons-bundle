import {isNull} from '../../../assert/index.js'
import {TransporterHandler} from "./transporters/TransporterHandler.js";
import {HotLogLevel} from "./HotLogLevel.js";

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
   * @type {boolean}
   */
  #synchronous = true
  /**
   * @param {Log} log
   * @param {?HotLogLevel}threshold
   * @return {TransporterHandler}
   */
  #commitClb = (log, threshold) => this.#transporters.commit(log, threshold)

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
   * @param {?Window} [window=null]
   * @return {HotLog}
   */
  asynchronous(window = null) {
    this.#synchronous = false
    if (!isNull(window)) {
      if ('requestIdleCallback' in window) {
        this.#commitClb = (log, threshold) => {
          window.requestIdleCallback(() => {
            this.#transporters.commit(log, threshold)
          })
        }
      } else {
        this.#commitClb = (log, threshold) => {
          setTimeout(() => {
            this.#transporters.commit(log, threshold)
          }, 10)
        }
      }
    }
    return this
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
    this.#commitClb(log, threshold)
    return this
  }
}