import { globalFlexioImport } from '@flexio-oss/global-import-registry'
import { assertType, isNumber, isNull } from '@flexio-oss/assert'
import {FlexArray} from '../FlexArray'
import {equalsPrimitive} from './Equals'
import {TypeCheck} from '../TypeCheck'

/**
 * @extends {FlexArray<?number>}
 */
class LongArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(isNumber(element), 'element should be a number')
    }
  }
  /**
   *
   * @param {?LongArray} to
   * @return  {boolean}
   */
  equals(to) {
    return equalsPrimitive(this, to, (to) => {
      TypeCheck.assertIsLongArray(to)
    })
  }
}
export { LongArray }
