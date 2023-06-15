import {isNull} from '../../../../assert/index.js'
import {globalFlexioImport} from '../../../../global-import-registry/index.js'

export class DOMPositionHelper {
  /**
   * @param {Element} element
   * @return {DOMPosition}
   */
  static getElementBounding(element) {
    const rect = element?.getBoundingClientRect() ?? null
    return (isNull(rect)) ? rect : globalFlexioImport.io.flexio.js_helpers.types.DOMPosition.fromObject(rect).build()
  }

  /**
   * @param {CustomEvent|MouseEvent|PointerEvent} event
   * @return {DOMPosition}
   */
  static getCursorPosition(event) {
    return globalFlexioImport.io.flexio.js_helpers.types.DOMPosition.builder()
      .x(event.clientX)
      .y(event.clientY)
      .width(0)
      .height(0)
      .build()
  }
}