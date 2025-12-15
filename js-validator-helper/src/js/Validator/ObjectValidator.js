import {Validator} from './Validator.js'
import {isNull} from '../__import__assert.js'
import {TypeCheck} from '../__import__flex-types.js'

/**
 * @implements {Validator}
 */
export class ObjectValidator extends Validator {
  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isObjectValue(value)
  }

  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isObjectValue(value) && !isNull(value)
  }

  /**
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {ObjectValue} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    console.error('ObjectValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {ObjectValue} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('ObjectValidator: no enumeratedValues for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('ObjectValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('ObjectValidator: no max size for `validateMaxSize`')
    return true;
  }
}
