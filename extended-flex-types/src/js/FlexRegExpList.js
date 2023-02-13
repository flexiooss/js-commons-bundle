import {globalFlexioImport} from '../../../global-import-registry/index.js'
import {assertInstanceOfOrNull} from '../../../assert/index.js'
import {FlexArray} from '../../../flex-types/index.js'

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