import {globalFlexioImport} from '../../../global-import-registry/index.js'

export class EventHelper {
  /**
   * @param {CustomEvent|KeyboardEvent|PointerEvent} event
   * @return {ModifierKeys|null}
   */
  static getModifierKeys(event) {
    if (event instanceof KeyboardEvent) {
      return new globalFlexioImport.io.flexio.flex_types.ModifierKeysBuilder()
        .alt(event.altKey ?? false)
        .ctrl(event.ctrlKey ?? false)
        .meta(event.metaKey ?? false)
        .shift(event.shiftKey ?? false)
        .build()
    } else if (event instanceof PointerEvent) {
      return new globalFlexioImport.io.flexio.flex_types.ModifierKeysBuilder()
        .alt(event.altKey ?? false)
        .ctrl(event.ctrlKey ?? false)
        .meta(event.metaKey ?? false)
        .shift(event.shiftKey ?? false)
        .build()
    } else if (event instanceof CustomEvent) {
      return new globalFlexioImport.io.flexio.flex_types.ModifierKeysBuilder()
        .alt(event.detail?.altKey ?? false)
        .ctrl(event.detail?.ctrlKey ?? false)
        .meta(event.detail?.metaKey ?? false)
        .shift(event.detail?.shiftKey ?? false)
        .build()
    }
    return null
  }
}