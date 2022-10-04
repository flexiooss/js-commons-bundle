import {isNull, NotOverrideException} from '../../../../assert'
import {isImplement} from '../../../../js-helpers'

/**
 * @mixin
 * @param {?*} Base
 * @return {{new(): Builder, prototype: Builder}}
 */
export const builder = (Base = null) => {
  if (isNull(Base)) {
    Base = class{}
  }
  /**
   * @interface
   */
  return class Builder extends Base {
    /**
     * @return {HaveBuilder}
     */
    build() {
      throw NotOverrideException.FROM_INTERFACE('Builder')
    }
  }
}
const constructorString = Object.getPrototypeOf(new (builder((class e {
})))).constructor.toString()


/**
 *
 * @param {Builder} inst
 * @return {boolean}
 */
export const implementsBuilder = (inst) => {
  return isImplement(inst, constructorString)
}
