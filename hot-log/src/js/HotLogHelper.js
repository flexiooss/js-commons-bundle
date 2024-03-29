import { formatType} from '../../../assert/index.js'
import {HotLogLevel} from "./HotLogLevel.js";
import {ThresholdResolver} from "./transporters/helpers/ThresholdResolver.js";

export class HotLogHelper {
  /**
   * @param {*} v
   * @return {string}
   */
  static formatType(v) {
    return formatType(v)
  }

  /**
   * @param {*} v
   * @return {string}
   */
  static prettyJsonStringify(v) {
    return JSON.stringify(v, null, 2)
  }

  /**
   * @param {HotLogLevel} threshold
   * @return {ThresholdResolver}
   */
  static thresholdResolver(threshold) {
    return new ThresholdResolver(threshold)
  }

  /**
   * @param {?HotLogLevel} thresholdTransporter
   * @param {?HotLogLevel} thresholdLogger
   * @param {FilterListHandler} [filterListHandler=null]
   * @return {ThresholdResolver}
   */
  static thresholdResolverFromTransporter(thresholdTransporter, thresholdLogger, filterListHandler) {
    return ThresholdResolver.fromTransporter(thresholdTransporter, thresholdLogger, filterListHandler)
  }

}

