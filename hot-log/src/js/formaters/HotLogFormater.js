import {isImplement} from '../../../../js-helpers'
import {NotOverrideException} from '../../../../assert'

export const hotLogFormater = (Base) => {
  /**
   * @interface
   */
  return class HotLogFormater extends Base {
    /**
     * @param {Log} log
     * @return {string}
     */
    format(log) {
      NotOverrideException.FROM_INTERFACE('HotLogFormater')
    }
  }

}

const constructorString = Object.getPrototypeOf(new (hotLogFormater((class e {
})))).constructor.toString()

/**
 * @param {HotLogFormater} inst
 * @return {boolean}
 */
export const implementsHotLogFormater = (inst) => {
  return isImplement(inst, constructorString)
}

