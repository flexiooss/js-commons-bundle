import {assertType, isInteger, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {equalsPrimitive} from './Equals.js'
import {TypeCheck} from '../TypeCheck.js'

/**
 * @extends {FlexArray<?number>}
 */
class IntegerArray extends FlexArray {
  /**
   * @description should override Array js behaviour which sets the length of array
   * @param {TYPE[]} args
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
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsIntegerArray(to)
    })
  }

  /**
   * @param {?IntegerArray} a
   * @param {?IntegerArray} b
   * @return  {boolean}
   */
  static arraysEquals(a, b) {
    if (isNull(a)) return isNull(b)
    return equalsPrimitive(a, b, (v) => {
      TypeCheck.assertIsIntegerArray(v)
    })
  }
}

export {IntegerArray}
