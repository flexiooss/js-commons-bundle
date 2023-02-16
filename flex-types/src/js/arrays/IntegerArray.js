import {assertType, isInteger, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {equalsPrimitive} from './Equals.js'
import {TypeCheck} from '../TypeCheck.js'

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
