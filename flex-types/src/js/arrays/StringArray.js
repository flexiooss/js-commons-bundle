import {assertType, isNull, isString} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'


/**
 * @extends {FlexArray<?string>}
 */
class StringArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isString(element), 'element should be a string')
    }
  }

  /**
   *
   * @param {?StringArray} to
   * @returns {boolean}
   */
  equals(to) {
    return this.constructor.arraysEquals(this, to)
  }

  /**
   * @param {?StringArray} a
   * @param {?StringArray} b
   * @returns {boolean}
   */
  static arraysEquals(a, b) {
    if (isNull(a)) return isNull(b)
    return FlexArray.compareArraysAsPrimitives(a, b)
  }

}


export {StringArray}
