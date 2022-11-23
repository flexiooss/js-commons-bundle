import { globalFlexioImport } from '../__import__global-import-registry'
import {assertType, isNull, TypeCheck} from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'

/**
 * @extends {FlexArray<?FlexDateTime>}
 */
class DateTimeArray extends FlexArray {

  /**
   * @param {?Object} item
   * @return {?FlexDateTime}
   */
  static itemFromObject(item) {
    if (isNull(item)) return null
    if (TypeCheck.assertIsObject(item)) {
      return globalFlexioImport.io.flexio.flex_types.FlexDateTime.fromObject(item).build()
    }
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof  globalFlexioImport.io.flexio.flex_types.FlexDateTime, 'element should be a FlexDateTime')
    }
  }

  /**
   *
   * @param {?DateTimeArray} to
   * @return  {boolean}
   */
  equals(to) {

    return equalsObject(this, to, (to) => {
      assertType(
        to instanceof DateTimeArray,
        'TypeCheck: `to` should be DateTimeArray'
      )
    })
  }


}
export { DateTimeArray }
