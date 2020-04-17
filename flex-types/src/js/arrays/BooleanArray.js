import { assertType, isBoolean, isNull } from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsPrimitive} from './Equals'
import {TypeCheck} from '../TypeCheck'

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
}
export { BooleanArray }
