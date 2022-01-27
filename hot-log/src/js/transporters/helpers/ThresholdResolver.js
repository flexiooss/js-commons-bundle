import {HotLogLevel} from "../../HotLogLevel";
import {assertInstanceOf} from '../../../../../assert'

export class ThresholdResolver {
  /**
   * @type {HotLogLevel}
   */
  #threshold

  /**
   * @param {HotLogLevel} threshold
   */
  constructor(threshold) {
    this.#threshold = assertInstanceOf(threshold, HotLogLevel, 'HotLogLevel');
  }

  /**
   *
   * @param {HotLogLevel} threshold
   * @return {boolean}
   */
  gte(threshold) {
    assertInstanceOf(threshold, HotLogLevel, 'HotLogLevel');
    if (threshold.FATAL) {
      return true
    }
    if (this.#threshold === HotLogLevel.ERROR) {
      return threshold === HotLogLevel.FATAL
    }
    if (this.#threshold === HotLogLevel.WARN) {
      return threshold === HotLogLevel.FATAL || threshold === HotLogLevel.ERROR
    }
    if (this.#threshold === HotLogLevel.INFO) {
      return threshold !== HotLogLevel.DEBUG && threshold !== HotLogLevel.TRACE
    }
    if (this.#threshold === HotLogLevel.DEBUG) {
      return threshold !== HotLogLevel.TRACE
    }
    return true
  }

}