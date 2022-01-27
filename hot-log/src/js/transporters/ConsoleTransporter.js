import {hotLogTransporter} from "./HotLogTransporter";
import {Log} from "../Log";
import {HotLogLevel} from "../HotLogLevel";
import {assertInstanceOf, assertType, isNull} from "../../../../assert";
import {implementsHotLogFormater} from "../formaters/HotLogFormater";
import {ThresholdResolver} from "./helpers/ThresholdResolver";

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
   * @param {HotLogFormater} formater
   * @param {?HotLogLevel} [threshold=null]
   */
  constructor(formater, threshold = null) {
    super();
    assertType(implementsHotLogFormater(formater), 'should implements HotLogFormater')
    this.#formater = formater
    if (!isNull(threshold)) {
      this.#threshold = assertInstanceOf(threshold, HotLogLevel, 'HotLogLevel');
    }
  }


  /**
   * @param {Log} log
   */
  commit(log) {
    if (new ThresholdResolver(this.#threshold).gte(log.level())) {

      /**
       * @type {string}
       */
      const formatedLog = this.#formater.format(log)

      switch (log.level()) {
        case HotLogLevel.FATAL:
          globalThis.console.error(formatedLog)
          break
        case HotLogLevel.ERROR:
          globalThis.console.error(formatedLog)
          break
        case HotLogLevel.WARN:
          globalThis.console.warn(formatedLog)
          break
        case HotLogLevel.INFO:
          globalThis.console.info(formatedLog)
          break
        case HotLogLevel.DEBUG:
          globalThis.console.debug(formatedLog)
          break
        case HotLogLevel.TRACE:
          globalThis.console.trace(formatedLog)
          break
      }
    }
  }
}
