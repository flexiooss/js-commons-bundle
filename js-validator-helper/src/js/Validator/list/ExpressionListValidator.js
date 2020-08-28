import {Validator} from '../Validator'
import {globalFlexioImport} from '../../__import__global-import-registry'
import {ListValidator} from './ListValidator'

/**
 * @implements {Validator}
 */
export class ExpressionListValidator extends ListValidator {
  /**
   *
   * @param {ExpressionList} value
   * @return {boolean}
   */
  validateType(value) {
    return value instanceof globalFlexioImport.io.flexio.services.resources.api.types.ExpressionList
  }
}
