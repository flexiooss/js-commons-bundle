import {globalFlexioImport} from './__import__global-import-registry.js'
import {assertType, isNull} from './__import__assert.js'
import {FlexArray} from './FlexArray.js'

/**
 * @extends {FlexArray<?Geoloc>}
 */
class GeolocList extends FlexArray {
  constructor(...args) {
    super(...args)
  }

  /**
   * @param {number} index
   * @returns {Geoloc}
   */
  get(index) {
    return this[index]
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof globalFlexioImport.io.flexio.flex_types.type.Geoloc, 'element should be a Geoloc')
    }
  }

  equals(to) {
    return FlexArray.compareArraysAsObjectWithEquals(this, to)
  }
}

export {GeolocList}
