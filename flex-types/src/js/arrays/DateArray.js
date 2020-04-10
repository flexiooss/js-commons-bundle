import { globalFlexioImport } from '../__import__global-import-registry'
import { assertType, isNull } from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'

/**
 * @extends {FlexArray<?FlexDate>}
 */
class DateArray extends FlexArray {

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

    return equalsObject(this, to, (to) => {
      assertType(
        to instanceof DateArray,
        'TypeCheck: `to` should be DateArray'
      )
    })
  }


}
export { DateArray }
