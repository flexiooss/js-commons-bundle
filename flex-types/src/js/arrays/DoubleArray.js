import { assertType, isNumber, isNull } from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsPrimitive} from './Equals'
import {TypeCheck} from '../TypeCheck'

/**
 * @extends {FlexArray<?number>}
 */
class DoubleArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isNumber(element), 'element should be a number')
    }
  }
  /**
   *
   * @param {?DoubleArray} to
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsDoubleArray(to)
    })
  }
}
export { DoubleArray }
