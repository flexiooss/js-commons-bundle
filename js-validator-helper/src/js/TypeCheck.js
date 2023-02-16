import {ValueObjectValidator} from './ValueObjectValidator/ValueObjectValidator.js'
import {Validator} from './Validator/Validator.js'

export class TypeCheck {
  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isValueObjectValidator(instance) {
    return instance instanceof ValueObjectValidator
  }

  /**
   *
   * @param {*} instance
   * @return {boolean}
   */
  static isValidator(instance) {
    return instance instanceof Validator
  }
}
