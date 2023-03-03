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
   */
  constructor(events, callback, priority, once, active = true, guard = null) {
    super(events, callback, once, active, guard)
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
   * @return {EventListenerConfig}
   */
  withActive(active) {
    return OrderedEventListenerConfig.create(this.events(), this.callback(), this.priority(), this.once(), active, this.guard())
  }

  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {number} priority
   * @param {boolean} once
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   * @return {OrderedEventListenerConfig}
   * @constructor
   * @readonly
   */
  static create(events, callback, priority, once, active = true, guard = null) {
    return deepFreezeSeal(new OrderedEventListenerConfig(events, callback, priority, once, active, guard))
  }
}
