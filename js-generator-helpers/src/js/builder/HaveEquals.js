import {isNull, NotOverrideException,isUndefined} from '../../../../assert/index.js'
import {isImplement} from '../../../../js-helpers/index.js'

/**
 * @mixin
 * @param {?*} Base
 * @return {{new(): HaveEquals, prototype: HaveEquals}}
 */
export const haveEquals = (Base = class{}) => {
  /**
   * @interface
   */
  return class HaveEquals extends Base {
    /**
     * @param {?this} to
     * @return {boolean}
     */
     equals(to) {
      if(!isUndefined(super.equals)) return super.equals(to)
      throw NotOverrideException.FROM_INTERFACE('HaveEquals')
    }
  }
}
const constructorString = Object.getPrototypeOf(new (haveEquals((class e {
})))).constructor.toString()


/**
 *
 * @param {HaveBuilder} inst
 * @return {boolean}
 */
export const implementsHaveEquals = (inst) => {
  return isImplement(inst, constructorString)
}
