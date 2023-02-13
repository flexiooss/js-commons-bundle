import {globalFlexioImport} from '../__import__global-import-registry.js'
import {assertType, isNull} from '../__import__assert.js'
import {FlexArray} from '../FlexArray.js'
import {equalsObject} from './Equals.js'


/**
 * @extends {FlexArray<?FlexZonedDateTime>}
 */
class TzDateTimeArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime, 'element should be a FlexZonedDateTime')
    }
  }

  /**
   *
   * @param {?TzDateTimeArray} to
   * @return  {boolean}
   */
  equals(to) {

    return equalsObject(this, to, (to) => {
      assertType(
        to instanceof TzDateTimeArray,
        'TypeCheck: `to` should be TzDateTimeArray'
      )
    })
  }
}


export {TzDateTimeArray}
