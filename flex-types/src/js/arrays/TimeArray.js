import { globalFlexioImport } from '../__import__global-import-registry'
import {assertType, isNull, TypeCheck} from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'

/**
 * @extends {FlexArray<?FlexTime>}
 */
class TimeArray extends FlexArray {
  /**
   * @param {?Object} item
   * @return {?FlexTime}
   */
  static itemFromObject(item) {
    if (isNull(item)) return null
    if (TypeCheck.assertIsObject(item)) {
      return globalFlexioImport.io.flexio.flex_types.FlexTime.fromObject(item).build()
    }
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof globalFlexioImport.io.flexio.flex_types.FlexTime, 'element should be a FlexTime')
    }
  }

  /**
   *
   * @param {?TimeArray} to
   * @return  {boolean}
   */
  equals(to) {

    return equalsObject(this, to, (to) => {
      assertType(
        to instanceof TimeArray,
        'TypeCheck: `to` should be TimeArray'
      )
    })
  }


}
export { TimeArray }
