import {hotLogTransporter} from "../js/transporters/HotLogTransporter";
import {AbstractTransporter} from "../js/transporters/impl/AbstarctTransporter";
import {FilterListHandler} from "../js/transporters/filters/FilterListHandler";
import {ThresholdResolver} from "../js/transporters/helpers/ThresholdResolver";
import {HotLogLevel} from "../js/HotLogLevel";
import {isNull, TypeCheck} from '../../../assert'

/**
 * @implements {HotLogTransporter}
 * @extends AbstractTransporter
 */
export class TestTransporter extends AbstractTransporter {
  /**
   * @type {FilterListHandler}
   */
  #filters = new FilterListHandler()
  /**
   * @type {?function(boolean)}
   */
  #clb

  /**
   * @param {?function(boolean, Log)} [clb=null]
   * @param {?FilterList} [filters=null]
   */
  constructor(clb = null ,filters = null ) {
    super();
    if (!isNull(filters)) {
      this.#filters.replaceFilters(filters)
    }
    this.#clb = TypeCheck.assertIsFunctionOrNull(clb)
  }


  /**
   * @param {Log} log
   * @param {?HotLogLevel} threshold
   */
  commit(log, threshold) {
    if (ThresholdResolver.fromTransporter(this.threshold(), threshold, this.#filters).pass(log)) {
      if (!isNull(this.#clb)) {
        this.#clb.call(null, true, log)
      }
    } else {
      if (!isNull(this.#clb)) {
        this.#clb.call(null, false, log)
      }
    }
  }

}