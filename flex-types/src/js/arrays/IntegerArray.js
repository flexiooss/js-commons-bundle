import {assertType, isInteger, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'

/**
 * @extends {FlexArray<?number>}
 */
class IntegerArray extends FlexArray {
  /**
   * @description should override Array js behaviour which sets the length of array
   * @param {...number} args
   */
  constructor(...args) {
      super()
      this.push(...args)
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(isInteger(element), 'element should be a number')
    }
  }
  /**
   *
   * @param {?IntegerArray} to
   * @returns {boolean}
   */
  equals(to) {
    return FlexArray.compareArraysAsPrimitives(this, to)
  }

  /**
   * @param {?IntegerArray} a
   * @param {?IntegerArray} b
   * @returns {boolean}
   */
  static arraysEquals(a, b) {
    if (isNull(a)) return isNull(b)
    return FlexArray.compareArraysAsPrimitives(a, b)
  }
}

export {IntegerArray}
