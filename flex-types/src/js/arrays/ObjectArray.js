import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'


/**
 * @extends {FlexArray.<?ObjectValue>}
 */
class ObjectArray extends FlexArray {

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof globalFlexioImport.io.flexio.flex_types.ObjectValue, 'element should be an ObjectValue')
    }
  }

  /**
   *
   * @param {?ObjectArray} to
   * @return  {boolean}
   */
  equals(to) {

    return equalsObject(this, to, (to) => {
      assertType(
        to instanceof ObjectArray,
        'TypeCheck: `to` should be ObjectArray'
      )
    })

  }
}


export {ObjectArray}
