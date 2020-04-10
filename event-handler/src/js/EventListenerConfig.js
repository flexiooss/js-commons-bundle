import {isFunction,assert} from './__import__assert'
import {deepFreezeSeal} from './__import__js-type-helpers'
import {SymbolStringArray} from './__import__extended-flex-types'

export class EventListenerConfig {
  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   */
  constructor(events, callback) {
    assert(events instanceof SymbolStringArray,
      'EventListenerConfig:constructor: ̀`events` property assert be not empty'
    )
    assert(isFunction(callback),
      'EventListenerConfig:constructor: ̀`callback` property assert be Callable'
    )
    /**
     *
     * @type {SymbolStringArray}
     */
    this.events = events
    /**
     *
     * @type {EventHandlerBase~eventClb}
     */
    this.callback = callback
  }

  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @constructor
   * @readonly {EventListenerConfig}
   */
  static create(events, callback) {
    return deepFreezeSeal(new this(events, callback))
  }
}
