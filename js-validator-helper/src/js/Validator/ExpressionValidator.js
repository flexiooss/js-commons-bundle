import {Validator} from './Validator'
import {isNull} from '../__import__assert'
import {globalFlexioImport} from '../__import__global-import-registry'

/**
 * @implements {Validator}
 */
export class ExpressionValidator extends Validator {
  /**
   * @param {Expression} value
   * @return {boolean}
   */
  validateType(value) {
    return value instanceof globalFlexioImport.io.flexio.services.resources.api.types.Expression
  }

  /**
   * @param {Expression} value
   * @return {boolean}
   */
  validateNotNull(value) {
    return this.validateType(value) && !isNull(value)
  }

  /**
   * @param {Expression} value
   * @return {boolean}
   */
  validateNotEmpty(value) {
    return this.validateNotNull(value)
  }

  /**
   * @param {Expression} value
   * @param {string} rangeStart
   * @param {string} rangeEnd
   * @return {boolean}
   */
  validateInRange(value, rangeStart, rangeEnd) {
    throw new Error('ExpressionValidator: no range for `validateInRange`')
  }

  /**
   * @param {Expression} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    throw new Error('ExpressionValidator: no enumeratedValues for `validateRegex`')
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    throw new Error('ExpressionValidator: no regex for `validateRegex`')
  }
}
