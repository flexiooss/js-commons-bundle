import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'


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
