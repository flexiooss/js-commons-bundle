import {hotLogTransporter} from "../HotLogTransporter";
import {AbstractTransporter} from "./AbstarctTransporter";
import {FilterListHandler} from "../filters/FilterListHandler";
import {ThresholdResolver} from "../helpers/ThresholdResolver";
import {HotLogLevel} from "../../HotLogLevel";
import {isNull, TypeCheck} from '../../../../../assert'

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