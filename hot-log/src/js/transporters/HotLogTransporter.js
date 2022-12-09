import {isImplement} from '../../../../js-helpers'
import {NotOverrideException} from '../../../../assert'
import {HotLogLevel} from "../HotLogLevel";

export const hotLogTransporter = (Base) => {
  /**
   * @interface
   */
  return class HotLogTransporter extends Base {
    /**
     * @return {HotLogTransporter}
     */
    levelTrace() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @return {HotLogTransporter}
     */
    levelDebug() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @return {HotLogTransporter}
     */
    levelInfo() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @return {HotLogTransporter}
     */
    levelWarn() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @return {HotLogTransporter}
     */
    levelError() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @return {HotLogTransporter}
     */
    levelFatal() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @return {?HotLogLevel}
     */
    threshold() {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }

    /**
     * @param {Log} log
     * @param {?HotLogLevel} threshold
     * @return {Promise<void>}
     */
   async commit(log, threshold) {
      NotOverrideException.FROM_INTERFACE('HotLogTransporter')
    }
  }

}

const constructorString = Object.getPrototypeOf(new (hotLogTransporter((class e {
})))).constructor.toString()

/**
 * @param {HotLogTransporter} inst
 * @return {boolean}
 */
export const implementsHotLogTransporter = (inst) => {
  return isImplement(inst, constructorString)
}

