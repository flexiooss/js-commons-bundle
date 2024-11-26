import {Validator} from './Validator.js'
import {isNull, isNumber} from '../__import__assert.js'
import {globalFlexioImport} from '../__import__global-import-registry.js'

/**
 * @implements {Validator}
 */
export class NumberValidator extends Validator {
  /**
   * @param {Number} value
   * @return {boolean}
   */
  validateType(value) {
    return isNumber(value)
  }

  /**
   * @param {Number} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return this.validateType(value) && !isNull(value)
  }

  /**
   * @param {Number} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {Number} value
   * @param {string|null} rangeStart
   * @param {string|null} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    if (isNull(value)) {
      return true
    }
    let validate = this.validateType(value)
    if (validate && !isNull(rangeStart)) {
      validate = value >= parseFloat(rangeStart)
    }
    if (validate && !isNull(rangeEnd)) {
      validate = value <= parseFloat(rangeEnd)
    }
    return validate
  }

  /**
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
   * @param {Number} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('NumberValidator: no regex for `validateRegex`')
  }

  /**
   * @param {Number} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    if(isNull(value)){
      return true
    }
    return value.toString().length <= size
  }
}
