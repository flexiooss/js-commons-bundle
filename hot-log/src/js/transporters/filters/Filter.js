import {isImplement} from '../../../../../js-helpers/index.js'
import {NotOverrideException} from '../../../../../assert/index.js'

export const filter = (Base) => {
  /**
   * @interface
   */
  return class Filter extends Base {
    /**
     * @param {Log} log
     * @return {boolean}
     */
    match(log) {
      NotOverrideException.FROM_INTERFACE('Filter')
    }

  }

}

const constructorString = Object.getPrototypeOf(new (filter((class e {
})))).constructor.toString()

/**
 * @param {Filter} inst
 * @return {boolean}
 */
export const implementsFilter = (inst) => {
  return isImplement(inst, constructorString)
}

