import { globalFlexioImport } from '@flexio-oss/global-import-registry'
import {assertType, isBinary, isNull} from '@flexio-oss/assert'
import {FlexArray} from '../FlexArray'
import {equalsPrimitive} from './Equals'
import {TypeCheck} from '../TypeCheck'

/**
 * @extends {FlexArray<?Blob>}
 */
class BlobArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isBinary(element), 'element should be a binary')
    }
  }

  /**
   *
   * @param {?BlobArray} to
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsBooleanArray(to)
    })
  }
}
export { BlobArray }
