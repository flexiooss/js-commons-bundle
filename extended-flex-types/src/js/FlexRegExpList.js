import {globalFlexioImport} from '@flexio-oss/js-commons-bundle/global-import-registry'
import {assertInstanceOfOrNull} from '@flexio-oss/js-commons-bundle/assert'
import {FlexArray} from '@flexio-oss/js-commons-bundle/flex-types'

/**
 * @extends {FlexArray<?FlexRegExp>}
 */
export class FlexRegExpList extends FlexArray {
  constructor(...args) {
    super(...args)
  }

  /**
   * @param {number} index
   * @returns {FlexRegExp}
   */
  get(index) {
    return this[index]
  }

  _validate(element) {
    assertInstanceOfOrNull(element, globalFlexioImport.io.flexio.extended_flex_types.FlexRegExp, 'FlexRegExp')
  }

}