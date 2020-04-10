import {Validator} from './Validator'
import {isNull} from '../__import__assert'
import {TypeCheck} from '../__import__flex-types'

/**
 * @implements {Validator}
 */
export class DateValidator extends Validator {
  /**
   *
   * @param {FlexDate} value
   * @return {boolean}
   */
  validateType(value) {
    return TypeCheck.isFlexDate(value)
  }

  /**
   *
   * @param {FlexDate} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return TypeCheck.isFlexDate(value) && !isNull(value)
  }

  /**
   *
   * @param {FlexDate} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   *
   * @param {boolean} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('DateValidator: no range for `validateInRange`')
  }

  /**
   *
   * @param {boolean} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('DateValidator: no enumeratedValues for `validateInEnumerated`')
  }

  /**
   *
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('DateValidator: no regex for `validateRegex`')
  }
}
