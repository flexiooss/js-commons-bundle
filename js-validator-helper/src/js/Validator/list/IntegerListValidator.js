import {Validator} from '../Validator'
import {globalFlexioImport} from '../../__import__global-import-registry'
import {ListValidator} from './ListValidator'

/**
 * @implements {Validator}
 */
export class IntegerListValidator extends ListValidator {
  /**
   *
   * @param {IntegerArray} value
   * @return {boolean}
   */
  validateType(value) {
    return value instanceof globalFlexioImport.io.flexio.flex_types.arrays
      .IntegerArray
  }
}
