import {assertType, isBinary, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {equalsPrimitive} from './Equals.js'
import {TypeCheck} from '../TypeCheck.js'

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
