import {isImplement} from '../../../../js-helpers'
import {NotOverrideException} from '../../../../assert'

export const hotLogTransporter = (Base) => {
  /**
   * @interface
   */
  return class HotLogTransporter extends Base {
    /**
     * @param {Log} log
     */
    commit(log) {
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

