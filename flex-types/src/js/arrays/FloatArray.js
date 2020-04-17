import { assertType, isNumber, isNull } from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsPrimitive} from './Equals'
import {TypeCheck} from '../TypeCheck'


/**
 * @extends {FlexArray<?number>}
 */
class FloatArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isNumber(element), 'element should be a number')
    }
  }
  /**
   *
   * @param {?FloatArray} to
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsFloatArray(to)
    })
  }
}
export { FloatArray }
