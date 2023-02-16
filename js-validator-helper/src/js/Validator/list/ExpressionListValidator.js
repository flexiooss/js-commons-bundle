import {Validator} from '../Validator.js'
import {globalFlexioImport} from '../../__import__global-import-registry.js'
import {ListValidator} from './ListValidator.js'

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
