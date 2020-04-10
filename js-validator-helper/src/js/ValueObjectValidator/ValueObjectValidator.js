/**
 * @interface
 */
export class ValueObjectValidator {
  /**
   *
   * @param  object
   * @return {boolean}
   */
  isValid(object) {
    throw new Error('Should be override')
  }

}
