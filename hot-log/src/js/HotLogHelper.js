import {assertInstanceOf, formatType} from '../../../assert'
import {HotLogLevel} from "./HotLogLevel";
import {ThresholdResolver} from "./transporters/helpers/ThresholdResolver";

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

}

