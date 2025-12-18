import {Validator} from '../Validator.js'
import {isNull, NotOverrideException} from '../../__import__assert.js'

/**
 * @implements {Validator}
 */
export class ListValidator extends Validator {

  /**
   * @param {Array} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return this.validateType(value) && !isNull(value)
  }

  /**
   * @param {Array} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value) && value.length > 0
  }

  /**
   * @param {Array} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    console.error('ListValidator: no range for `validateInRange`  maybe should be to item-constraints')
    return true;
  }

  /**
   *
   * @param {Array} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('ListValidator: no enumeratedValues for `validateInEnumerated` maybe should be to item-constraints')
    return true;
  }

  /**
   *
   * @param {Array} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('ListValidator: no regex for `validateRegex`  maybe should be to item-constraints')
    return true;
  }

  /**
   * @param {*} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    return this.validateNotNull(value) && value.length <= size
  }
}
