import {AbstractTransporter} from '../js/transporters/impl/AbstarctTransporter.js'
import {FilterListHandler} from '../js/transporters/filters/FilterListHandler.js'
import {ThresholdResolver} from '../js/transporters/helpers/ThresholdResolver.js'
import {HotLogLevel} from '../js/HotLogLevel.js'
import {isNull, TypeCheck} from '../../../assert/index.js'

/**
 * @implements {HotLogTransporter}
 * @extends {AbstractTransporter}
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
  async commit(log, threshold) {
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