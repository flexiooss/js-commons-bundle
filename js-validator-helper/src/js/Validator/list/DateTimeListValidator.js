import {globalFlexioImport} from '../../__import__global-import-registry.js'
import {ListValidator} from './ListValidator.js'

/**
 * @implements {Validator}
 */
export class DateTimeListValidator extends ListValidator {
  /**
   * @param {StringArray} value
   * @return {boolean}
   */
  validateType(value) {
    return value instanceof globalFlexioImport.io.flexio.flex_types.arrays
      .DateTimeArray
  }

}
