import {globalFlexioImport} from '../../../global-import-registry'
import {assertInstanceOfOrNull} from '../../../assert'
import {FlexArray} from '../../../flex-types'

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