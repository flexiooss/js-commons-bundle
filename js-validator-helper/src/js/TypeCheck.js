import {ValueObjectValidator} from './ValueObjectValidator/ValueObjectValidator'
import {Validator} from './Validator/Validator'

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
