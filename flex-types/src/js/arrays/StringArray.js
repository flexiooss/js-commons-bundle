import {assertType, isNull, isString} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {TypeCheck} from '../TypeCheck.js'
import {equalsPrimitive} from './Equals.js'


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
