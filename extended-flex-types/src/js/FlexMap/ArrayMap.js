import {FlexMap} from '../__import__flex-types.js'
import {assertType, isArray} from '../__import__assert.js'

/**
 * @extends {FlexMap<?Array>}
 */
export class ArrayMap extends FlexMap {

  /**
   *
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    assertType(isArray(v), 'ArrayMap:_validate: input should be an Array')
  }

  /**
   *
   * @param key
   * @param {*} value
   */
  push(key, value) {
    if (!this.has(key)) {
      this.set(key, [])
    }
    let col = this.get(key)
    col.push(value)
  }
}
