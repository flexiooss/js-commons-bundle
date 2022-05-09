import {isNumber, assertType, TypeCheck} from './__import__assert'
import {deepFreezeSeal} from './__import__js-generator-helpers'
import {EventListenerConfig} from './EventListenerConfig'

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
   * @param {boolean} [active=true]
   */
  constructor(events, callback, priority, active = true) {
    super(events, callback, active)
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
    return OrderedEventListenerConfig.create(this.events(), this.callback(), this.priority(), active)
  }


  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {number} priority
   * @param {boolean} [active=true]
   * @return {OrderedEventListenerConfig}
   * @constructor
   * @readonly
   */
  static create(events, callback, priority, active = true) {
    return deepFreezeSeal(new OrderedEventListenerConfig(events, callback, priority, active))
  }
}
