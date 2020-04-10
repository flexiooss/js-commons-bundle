import {isImplement} from '../js/isImplement'

export const bibiInterface = (Base) => {
  /**
   * @interface
   */
  return class BibiInterface extends Base {
    /**
     *
     * @param {*} value
     */
    dispatchChange(value) {
      throw new Error('should be override')
    }

    /**
     *
     * @return {ChangeableFormFieldViewEvent}
     */
    on() {
      throw new Error('should be override')
    }
  }

}

const bibiString = Object.getPrototypeOf(new (bibiInterface((class e {
})))).constructor.toString()


/**
 *
 * @param {BubuInterface} inst
 * @return {boolean}
 */
export const implementsBibi = (inst) => {
  return isImplement(inst, bibiString)
}
