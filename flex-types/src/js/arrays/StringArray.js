import {assertType, isNull, isString} from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {TypeCheck} from '../TypeCheck'
import {equalsPrimitive} from './Equals'


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
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsStringArray(to)
    })
  }

}


export {StringArray}
