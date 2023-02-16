import {Validator} from '../Validator.js'
import {globalFlexioImport} from '../../__import__global-import-registry.js'
import {ListValidator} from './ListValidator.js'

/**
 * @implements {Validator}
 */
export class NumberListValidator extends ListValidator {
  /**
   *
   * @param {FloatArray} value
   * @return {boolean}
   */
  validateType(value) {
    return value instanceof globalFlexioImport.io.flexio.flex_types.arrays
      .FloatArray
  }
}
