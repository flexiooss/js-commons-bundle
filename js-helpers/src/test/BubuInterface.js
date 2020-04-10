import {isImplement} from '../js/isImplement'


export const bubuInterface = (Base) => {
  /**
   * @interface
   */
  return class BubuInterface extends Base {
    /**
     *
     * @param {*} value
     */
    dispatchChange2(value) {
      throw new Error('should be override')
    }

    /**
     *
     * @return {ChangeableFormFieldViewEvent}
     */
    on2() {
      throw new Error('should be override')
    }
  }

}

const bubuString = Object.getPrototypeOf(new (bubuInterface((class e {
})))).constructor.toString()

/**
 *
 * @param {BubuInterface} inst
 * @return {boolean}
 */
export const implementsBubu = (inst) => {
  return isImplement(inst, bubuString)
}
