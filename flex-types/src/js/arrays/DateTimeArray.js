import { globalFlexioImport } from '@flexio-oss/global-import-registry'
import { assertType, isNull } from '@flexio-oss/assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'

/**
 * @extends {FlexArray<?FlexDateTime>}
 */
class DateTimeArray extends FlexArray {

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
