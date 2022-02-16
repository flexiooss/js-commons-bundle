import {hotLogTransporter} from "../HotLogTransporter";
import {Log} from "../../Log";
import {HotLogLevel} from "../../HotLogLevel";
import {assertInstanceOf, assertType, isArrowFunction, isNull, TypeCheck} from "../../../../../assert";
import {implementsHotLogFormater} from "../../formaters/HotLogFormater";
import {ThresholdResolver} from "../helpers/ThresholdResolver";
import {FilterList} from "../filters/FilterList";
import {FilterListHandler} from "../filters/FilterListHandler";
import {ConsoleFormater} from "../../formaters/ConsoleFormater";
import {NodejsConsoleFormater} from "../../formaters/NodejsConsoleFormater";
import {AbstractTransporter} from "./AbstarctTransporter";

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
   */
  commit(log, threshold) {
    if (ThresholdResolver.fromTransporter(this.threshold(), threshold, this.#filters).pass(log)) {

      /**
       * @type {string}
       */
      const formatedLog = this.#formater.format(log)

      switch (log.level()) {
        case HotLogLevel.FATAL:
          globalThis.console.error(formatedLog)
          this.#logContext(log)
          break
        case HotLogLevel.ERROR:
          globalThis.console.error(formatedLog)
          this.#logContext(log)
          break
        case HotLogLevel.WARN:
          globalThis.console.warn(formatedLog)
          this.#logContext(log)
          break
        case HotLogLevel.INFO:
          globalThis.console.info(formatedLog)
          this.#logContext(log)
          break
        case HotLogLevel.DEBUG:
          globalThis.console.debug(formatedLog)
          this.#logContext(log)
          break
        case HotLogLevel.TRACE:
          globalThis.console.trace(formatedLog)
          this.#logContext(log)
          break
      }
    }
  }

  /**
   * @param {Log} log
   */
  #logContext(log) {
    if (!isNull(log.context())) {
      globalThis.console.debug(log.context())
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
      value = value.call(null, isNull(this.#filters) ? new FilterList() : this.#filters)
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