import {assertType, isNumber, isNull} from '../__import__assert.js'
import {FlexArray, FlexArrayWithCustomConstructor} from '../FlexArray.js'


/**
 * @extends {FlexArrayWithCustomConstructor<?number>}
 */
class FloatArray extends FlexArrayWithCustomConstructor {
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
      assertType(isNumber(element), 'element should be a number')
    }
  }

  /**
   *
   * @param {?FloatArray} to
   * @returns {boolean}
   */
  equals(to) {
    return FlexArray.compareArraysAsPrimitives(this, to)
  }

  /**
   * @param {?FloatArray} a
   * @param {?FloatArray} b
   * @returns {boolean}
   */
  static arraysEquals(a, b) {
    if (isNull(a)) return isNull(b)
    return FlexArray.compareArraysAsPrimitives(a, b)
  }

}

export {FloatArray}
