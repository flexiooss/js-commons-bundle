import {isNull} from '../../../../assert/index.js'
import {globalFlexioImport} from '../../../../global-import-registry/index.js'

export class DOMPositionHelper {
  /**
   * @param {Element} element
   * @return {DOMPosition}
   */
  static getElementBounding(element) {
    const rect = element?.getBoundingClientRect() ?? null
    return (isNull(rect)) ? rect : globalFlexioImport.io.flexio.flex_types.DOMPosition.fromObject(rect).build()
  }

  /**
   * @param {PointerEvent|MouseEvent|TouchEvent} event
   * @return {DOMPosition}
   */
  static getCursorPosition(event) {
    return globalFlexioImport.io.flexio.flex_types.DOMPosition.builder()
      .x(event.clientX)
      .y(event.clientY)
      .width(0)
      .height(0)
      .build()
  }
}