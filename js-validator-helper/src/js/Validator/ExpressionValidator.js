import {Validator} from './Validator.js'
import {isNull} from '../__import__assert.js'
import {globalFlexioImport} from '../__import__global-import-registry.js'

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
    console.error('ExpressionValidator: no range for `validateInRange`')
    return true;
  }

  /**
   * @param {Expression} value
   * @param {StringArray} enumeratedValues
   * @return {boolean}
   */
  validateInEnumerated(value, enumeratedValues) {
    console.error('ExpressionValidator: no enumeratedValues for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {RegExp} regex
   * @return {boolean}
   */
  validateRegex(value, regex) {
    console.error('ExpressionValidator: no regex for `validateRegex`')
    return true;
  }

  /**
   * @param {string} value
   * @param {number} size
   * @return {boolean}
   */
  validateMaxSize(value, size) {
    console.error('ExpressionValidator: no max size for `validateMaxSize`')
    return true;
  }
}
