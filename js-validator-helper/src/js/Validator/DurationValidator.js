import {isInteger, isNull} from '../__import__assert'
import {Validator} from './Validator'
import {globalFlexioImport} from '../__import__global-import-registry'
import {TypeCheck} from '../__import__flex-types'

/**
 * @implements {Validator}
 */
export class DurationValidator extends Validator {
  /**
   *
   * @param {Number} value
   * @return {boolean}
   */
  validateType(value) {
    return isInteger(value)
  }
  /**
   *
   * @param {Number} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return this.validateType(value) && !isNull(value)
  }

  /**
   *
   * @param {Number} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   *
   * @param {Number} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    if(isNull(value)){
      return true
    }
    return this.validateType(value) && value >= parseInt(rangeStart, 10) && value <= parseInt(rangeEnd,10)
  }

  /**
   *
   * @param {Number} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    if(isNull(value)){
      return true
    }
    return TypeCheck.isStringArray(enumeratedValues) && this.validateType(value) && enumeratedValues.mapTo(new globalFlexioImport.io.flexio.flex_types.arrays.IntegerArray(), v => parseInt(v,10)).includes(value)
  }

  /**
   *
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('IntegerValidator: no regex for `validateRegex`')
  }
}
