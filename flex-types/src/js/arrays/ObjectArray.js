import {globalFlexioImport} from '../__import__global-import-registry'
import {assertType, isNull,  TypeCheck} from '../__import__assert'
import {FlexArray} from '../FlexArray'
import {equalsObject} from './Equals'


/**
 * @extends {FlexArray.<?ObjectValue>}
 */
class ObjectArray extends FlexArray {
  /**
   * @param {?Object} item
   * @return {?ObjectValue}
   */
  static itemFromObject(item) {
    if (isNull(item)) return null
    if (TypeCheck.assertIsObject(item)) {
      return globalFlexioImport.io.flexio.flex_types.ObjectValue.fromObject(item).build()
    }
  }

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
