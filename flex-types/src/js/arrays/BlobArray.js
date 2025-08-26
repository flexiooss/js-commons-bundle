import {assertType, isBinary, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'

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
   * @returns {boolean}
   */
  equals(to) {
    return FlexArray.compareArraysAsPrimitives(this, to)
  }
}
export { BlobArray }
