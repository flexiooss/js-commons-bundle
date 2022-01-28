import {hotLogTransporter} from "./HotLogTransporter";
import {Log} from "../Log";
import {HotLogLevel} from "../HotLogLevel";
import {assertInstanceOf, assertType, isNull} from "../../../../assert";
import {implementsHotLogFormater} from "../formaters/HotLogFormater";
import {ThresholdResolver} from "./helpers/ThresholdResolver";
import {FilterList} from "./filters/FilterList";
import {FilterListHandler} from "./filters/FilterListHandler";

/**
 * @implements {HotLogTransporter}
 */
export class ConsoleTransporter extends hotLogTransporter(class {
}) {
  /**
   * @type {HotLogFormater}
   */
  #formater
  /**
   * @type {HotLogLevel}
   */
  #threshold = HotLogLevel.INFO
  /**
   * @type {FilterListHandler}
   */
  #filters = new FilterListHandler()

  /**
   * @param {HotLogFormater} formater
   * @param {?HotLogLevel} [threshold=null]
   * @param {?FilterList} [filters=null]
   */
  constructor(formater, threshold = null, filters = null) {
    super();
    assertType(implementsHotLogFormater(formater), 'should implements HotLogFormater')
    this.#formater = formater
    if (!isNull(threshold)) {
      this.#threshold = assertInstanceOf(threshold, HotLogLevel, 'HotLogLevel');
    }
    if (!isNull(filters)) {
      this.#filters.replaceFilters(filters)
    }
  }


  /**
   * @param {Log} log
   */
  commit(log) {
    if (new ThresholdResolver(this.#threshold, this.#filters).pass(log)) {

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
