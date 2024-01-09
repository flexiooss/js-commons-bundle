import { assertType, isBoolean, isNull } from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {equalsPrimitive} from './Equals.js'
import {TypeCheck} from '../TypeCheck.js'

/**
 * @extends {FlexArray<?boolean>}
 */
class BooleanArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isBoolean(element), 'element should be a bool')
    }
  }

  /**
   *
   * @param {?BooleanArray} to
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsBooleanArray(to)
    })
  }

  /**
   * @param {?BooleanArray} a
   * @param {?BooleanArray} b
   * @return  {boolean}
   */
  static arraysEquals(a, b) {
    if (isNull(a)) return isNull(b)
    return equalsPrimitive(a, b, (v) => {
      TypeCheck.assertIsBooleanArray(v)
    })
  }
}
export { BooleanArray }
