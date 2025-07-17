import {HotLogLevel} from "../../HotLogLevel.js";
import {assertType, isArrowFunction, isFunction, isNull} from "../../../../../assert/index.js";
import {implementsHotLogFormater} from "../../formaters/HotLogFormater.js";
import {ThresholdResolver} from "../helpers/ThresholdResolver.js";
import {FilterList} from "../filters/FilterList.js";
import {FilterListHandler} from "../filters/FilterListHandler.js";
import {ConsoleFormater} from "../../formaters/ConsoleFormater.js";
import {NodejsConsoleFormater} from "../../formaters/NodejsConsoleFormater.js";
import {AbstractTransporter} from "./AbstarctTransporter.js";

/**
 * @implements {HotLogTransporter}
 * @extends AbstractTransporter
 */
export class ConsoleTransporter extends AbstractTransporter {
  /**
   * @type {HotLogFormater}
   */
  #formater
  /**
   * @type {FilterListHandler}
   */
  #filters = new FilterListHandler()

  /**
   * @param {HotLogFormater} formater
   * @param {?FilterList} [filters=null]
   */
  constructor(formater, filters = null) {
    super();
    assertType(implementsHotLogFormater(formater), 'should implements HotLogFormater')
    this.#formater = formater
    if (!isNull(filters)) {
      this.#filters.replaceFilters(filters)
    }
  }


  /**
   * @param {Log} log
   * @param {?HotLogLevel} threshold
   *
   */
  async commit(log, threshold) {
    return new Promise((ok, ko) => {
      setTimeout(() => {
        if (ThresholdResolver.fromTransporter(this.threshold(), threshold, this.#filters).pass(log)) {

          /**
           * @type {string}
           */
          const formatedLog = this.#formater.format(log)
          try {

            switch (log.level()) {
              case HotLogLevel.FATAL:
              case HotLogLevel.ERROR:
                if (new RegExp('\\[API\\]', 'ig').test(formatedLog)) {
                  globalThis.console.error(`%c API :: ${formatedLog}`, 'background: #911127; color: #e0dadb');
                } else {
                  globalThis.console.error(formatedLog)
                }
                this.#logContext(log)
                break
              case HotLogLevel.WARN:
                globalThis.console.info(`[WARN]${formatedLog}`)
                this.#logContext(log)
                break
              case HotLogLevel.INFO:
                globalThis.console.info(`[INFO]${formatedLog}`)
                this.#logContext(log)
                break
              case HotLogLevel.DEBUG:
                globalThis.console.log(`[DEBUG]${formatedLog}`)
                this.#logContext(log)
                break
              case HotLogLevel.TRACE:
                globalThis.console.trace(formatedLog)
                this.#logContext(log)
                break
            }
          } catch (e) {
            ko(e)
          }
          ok()
        }
      }, 0)
    })
  }

  /**
   * @param {Log} log
   */
  #logContext(log) {
    if (!isNull(log.context())) {
      globalThis.console.log(isFunction(log.context()) ? log.context().call(null) : log.context())
    }
  }
}


export class ConsoleTransporterBuilder {
  /**
   * @type {?HotLogFormater}
   */
  #formater = null
  /**
   * @type {?FilterList}
   */
  #filters = null

  /**
   * @param {?HotLogFormater} value
   * @return {ConsoleTransporterBuilder}
   */
  formater(value) {
    this.#formater = value;
    return this
  }

  /**
   * @param {?FilterList|function(FilterList):FilterList} value
   * @return {ConsoleTransporterBuilder}
   */
  filters(value) {
    if (isArrowFunction(value)) {
      value = value.call(null, (isNull(this.#filters) ? new FilterList() : this.#filters))
    }
    this.#filters = value;
    return this
  }

  /**
   * @return {ConsoleTransporterBuilder}
   */
  static getWithConsoleFormater() {
    return new ConsoleTransporterBuilder().formater(new ConsoleFormater())
  }

  /**
   * @return {ConsoleTransporterBuilder}
   */
  static getWithNodejsConsoleFormater() {
    return new ConsoleTransporterBuilder().formater(new NodejsConsoleFormater())
  }

  /**
   * @return {ConsoleTransporter}
   */
  build() {
    return new ConsoleTransporter(this.#formater, this.#filters)
  }

}