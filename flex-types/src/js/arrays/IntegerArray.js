import {assertType, isInteger, isNull} from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsPrimitive} from './Equals'
import {TypeCheck} from '../TypeCheck'

/**
 * @extends {FlexArray<?number>}
 */
class IntegerArray extends FlexArray {

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
}

export {IntegerArray}
