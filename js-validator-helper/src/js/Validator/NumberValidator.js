import {Validator} from './Validator'
import {isNull, isNumber} from '../__import__assert'
import {globalFlexioImport} from '../__import__global-import-registry'

/**
 * @implements {Validator}
 */
export class NumberValidator extends Validator {
  /**
   *
   * @param {Number} value
   * @return {boolean}
   */
  validateType(value) {
    return isNumber(value)
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
   * @param {string|null} rangeStart
   * @param {string|null} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    if (isNull(value)) {
      return true
    }

    if (isNull(rangeStart) && isNull(rangeEnd)) {
      return isNull(value)
    }
    if (isNull(rangeStart)) {
      return this.validateType(value) && value <= parseInt(rangeEnd, 10)
    }
    if (isNull(rangeEnd)) {
      return this.validateType(value) && value >= parseInt(rangeStart, 10)
    }
    return this.validateType(value) && value >= parseInt(rangeStart, 10) && value <= parseInt(rangeEnd, 10)

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
    return enumeratedValues instanceof globalFlexioImport.io.flexio.flex_types.arrays
      .StringArray && this.validateType(value) && enumeratedValues.mapTo(new globalFlexioImport.io.flexio.flex_types.arrays.FloatArray(), v => parseFloat(v)).includes(value)
  }

  /**
   *
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('NumberValidator: no regex for `validateRegex`')
  }
}
