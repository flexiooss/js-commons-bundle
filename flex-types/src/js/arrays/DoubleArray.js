import { assertType, isNumber, isNull } from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {equalsPrimitive} from './Equals.js'
import {TypeCheck} from '../TypeCheck.js'

/**
 * @extends {FlexArray<?number>}
 */
class DoubleArray extends FlexArray {
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
