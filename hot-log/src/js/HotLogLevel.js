import {FlexEnum} from '../../../flex-types/index.js'
import {assertInstanceOf} from '../../../assert/index.js'

class HotLogLevel extends FlexEnum {

}

HotLogLevel.initEnum(['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'])

/**
 * @property {HotLogLevel} HotLogLevel#TRACE
 * @property {HotLogLevel} HotLogLevel#DEBUG
 * @property {HotLogLevel} HotLogLevel#INFO
 * @property {HotLogLevel} HotLogLevel#WARN
 * @property {HotLogLevel} HotLogLevel#ERROR
 * @property {HotLogLevel} HotLogLevel#FATAL
 */
export {HotLogLevel}


export class HotLogLevelHelper {
  static assertIsHotLogLevel(level) {
    return assertInstanceOf(level, HotLogLevel, 'HotLogLevel')
  }

  /**
   * @param {HotLogLevel} a
   * @param {HotLogLevel} b
   * @return {boolean}
   */
  static equals(a, b) {
    HotLogLevelHelper.assertIsHotLogLevel(a)
    HotLogLevelHelper.assertIsHotLogLevel(b)
    return a.ordinal() === b.ordinal()
  }

  /**
   * @param {HotLogLevel} a
   * @param {HotLogLevel} b
   * @return {boolean}
   */
  static lt(a, b) {
    HotLogLevelHelper.assertIsHotLogLevel(a);
    HotLogLevelHelper.assertIsHotLogLevel(b);
    return a.ordinal() < b.ordinal()
  }

  /**
   * @param {HotLogLevel} a
   * @param {HotLogLevel} b
   * @return {boolean}
   */
  static lte(a, b) {
    HotLogLevelHelper.assertIsHotLogLevel(a);
    HotLogLevelHelper.assertIsHotLogLevel(b);
    return a.ordinal() <= b.ordinal()
  }

  /**
   * @param {HotLogLevel} a
   * @param {HotLogLevel} b
   * @return {boolean}
   */
  static gt(a, b) {
    HotLogLevelHelper.assertIsHotLogLevel(a);
    HotLogLevelHelper.assertIsHotLogLevel(b);
    return a.ordinal() > b.ordinal()
  }

  /**
   * @param {HotLogLevel} a
   * @param {HotLogLevel} b
   * @return {boolean}
   */
  static gte(a, b) {
    HotLogLevelHelper.assertIsHotLogLevel(a);
    HotLogLevelHelper.assertIsHotLogLevel(b);
    return a.ordinal() >= b.ordinal()
  }
}