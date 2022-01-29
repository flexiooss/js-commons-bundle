import {HotLogLevel, HotLogLevelHelper} from "../../HotLogLevel";
import {assertInstanceOf, isNull} from '../../../../../assert'
import {FilterListHandler} from "../filters/FilterListHandler";
import {HotLog} from "../../HotLog";

export class ThresholdResolver {
  /**
   * @type {HotLogLevel}
   */
  #threshold
  /**
   * @type {?FilterListHandler}
   */
  #filterListHandler = null

  /**
   * @param {HotLogLevel} threshold
   * @param {FilterListHandler} [filterListHandler=null]
   */
  constructor(threshold, filterListHandler = null) {
    this.#threshold = HotLogLevelHelper.assertIsHotLogLevel(threshold);
    if (!isNull(filterListHandler)) {
      this.#filterListHandler = assertInstanceOf(filterListHandler, FilterListHandler, 'FilterListHandler');
    }
  }

  /**
   * @param {?HotLogLevel} thresholdTransporter
   * @param {?HotLogLevel} thresholdLogger
   * @param {FilterListHandler} [filterListHandler=null]
   * @return {ThresholdResolver}
   */
  static fromTransporter(thresholdTransporter, thresholdLogger, filterListHandler) {
    return new ThresholdResolver((thresholdTransporter ?? thresholdLogger ?? HotLog.getHotLog().threshold()), filterListHandler)
  }

  /**
   * @param log
   */
  pass(log) {
    return ((HotLogLevelHelper.lte(this.#threshold, log.level()) && (isNull(this.#filterListHandler) || !this.#filterListHandler.hasFilters()))
      || (!isNull(this.#filterListHandler) && this.#filterListHandler.hasFilters() && this.#filterListHandler.match(log)))
  }
}