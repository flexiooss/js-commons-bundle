import {globalFlexioImport} from '../../../global-import-registry/index.js'

export class EventHelper {
  /**
   * @param {CustomEvent} event
   * @return {ModifierKeys}
   */
  static getModifierKeys(event) {
    return new globalFlexioImport.io.flexio.flex_types.ModifierKeysBuilder()
      .alt(event.detail?.altKey ?? false)
      .ctrl(event.detail?.ctrlKey ?? false)
      .meta(event.detail?.metaKey ?? false)
      .shift(event.detail?.shiftKey ?? false)
      .build()
  }
}