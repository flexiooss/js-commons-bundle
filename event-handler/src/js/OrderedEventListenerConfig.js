import {TypeCheck} from './__import__assert.js'
import {deepFreezeSeal} from './__import__js-generator-helpers.js'
import {EventListenerConfig} from './EventListenerConfig.js'

/**
 * @extends {EventListenerConfig}
 */
export class OrderedEventListenerConfig extends EventListenerConfig {
  /**
   * @type {Number}
   */
  #priority

  /**
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {number} priority
   * @param {boolean} once
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   * @param {?function()} onRemoveCallback
   * @param {boolean} [async=false]
   */
  constructor(events, callback, priority, once, active = true, guard = null,onRemoveCallback,async) {
    super(events, callback, once, active, guard,onRemoveCallback, async)
    /**
     * @type {Number}
     */
    this.#priority = TypeCheck.assertIsNumber(priority)
  }

  /**
   * @return {Number}
   */
  priority() {
    return this.#priority;
  }

  /**
   * @param {boolean} active
   * @return {OrderedEventListenerConfig}
   */
  withActive(active) {
    return OrderedEventListenerConfig.create(this.events(), this.callback(), this.priority(), this.once(), active, this.guard(), this.onRemoveCallback(), this.async())
  }

  /**
   * @param {EventHandlerBase~eventClb} value
   * @return {OrderedEventListenerConfig}
   */
  withCallback(value) {
    return OrderedEventListenerConfig.create(this.events(), value, this.priority(), this.once(), this.active(), this.guard(), this.onRemoveCallback(), this.async())
  }

  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {number} priority
   * @param {boolean} once
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   * @param {?function()} onRemoveCallback
   * @param {boolean} [async=false]
   * @return {OrderedEventListenerConfig}
   * @constructor
   * @readonly
   */
  static create(events, callback, priority, once, active = true, guard = null,onRemoveCallback,async=false) {
    return deepFreezeSeal(new OrderedEventListenerConfig(events, callback, priority, once, active, guard,onRemoveCallback,async))
  }
}
