import { globalFlexioImport } from '@flexio-oss/global-import-registry'
import { assertType, isNull } from '@flexio-oss/assert'
import { FlexArray } from './FlexArray'
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

}
export { GeolocList }
