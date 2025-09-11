import {assertType, isFile, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'

/**
 * @extends {FlexArray<?File>}
 */
class FileArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isFile(element), 'element should be a file')
    }
  }

  /**
   *
   * @param {?FileArray} to
   * @returns {boolean}
   */
  equals(to) {
    return FlexArray.compareArraysAsPrimitives(this, to)
  }
}

export {FileArray}
