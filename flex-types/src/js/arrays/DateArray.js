import {globalFlexioImport} from '../__import__global-import-registry.js'
import {assertType, isNull, TypeCheck} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'

/**
 * @extends {FlexArray<?FlexDate>}
 */
class DateArray extends FlexArray {
  /**
   * @param {?Object} item
   * @return {?FlexDate}
   */
  static itemFromObject(item) {
    if (isNull(item)) return null
    if (TypeCheck.assertIsObject(item)) {
      return globalFlexioImport.io.flexio.flex_types.FlexDate.fromObject(item).build()
    }
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof  globalFlexioImport.io.flexio.flex_types.FlexDate, 'element should be a FlexDate')
    }
  }

  /**
   *
   * @param {?DateArray} to
   * @return  {boolean}
   */
  equals(to) {
    return FlexArray.compareArraysAsObjectWithEquals(this, to)
  }


}
export { DateArray }
