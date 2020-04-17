import {Validator} from './Validator'
import {isNull} from '../__import__assert'
import {TypeCheck} from '../__import__flex-types'

/**
 * @implements {Validator}
 */
export class ObjectValidator extends Validator {
  /**
   *
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isObjectValue(value)
  }

  /**
   *
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isObjectValue(value) && !isNull(value)
  }

  /**
   *
   * @param {ObjectValue} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   *
   * @param {ObjectValue} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('ObjectValidator: no range for `validateInRange`')
  }

  /**
   *
   * @param {ObjectValue} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('ObjectValidator: no enumeratedValues for `validateRegex`')
  }

  /**
   *
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('ObjectValidator: no regex for `validateRegex`')
  }
}
