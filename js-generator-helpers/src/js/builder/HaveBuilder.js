import {isNull, NotOverrideException} from '../../../../assert/index.js'
import {isImplement} from '../../../../js-helpers/index.js'

/**
 * @mixin
 * @param {?*} Base
 * @return {{new(): HaveBuilder, prototype: HaveBuilder}}
 */
export const haveBuilder = (Base = null) => {
  if (isNull(Base)) {
    Base = class{}
  }
  /**
   * @interface
   */
  return class HaveBuilder extends Base {
    /**
     * @return {Builder}
     */
    static builder() {
      throw NotOverrideException.FROM_INTERFACE('HaveBuilder')
    }
  }
}
const constructorString = Object.getPrototypeOf(new (haveBuilder((class e {
})))).constructor.toString()


/**
 *
 * @param {HaveBuilder} inst
 * @return {boolean}
 */
export const implementsHaveBuilder = (inst) => {
  return isImplement(inst, constructorString)
}
