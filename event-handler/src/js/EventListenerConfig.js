import {assertInstanceOf, TypeCheck} from './__import__assert.js'
import {deepFreezeSeal} from './__import__js-generator-helpers.js'
import {SymbolStringArray} from './__import__extended-flex-types.js'

export class EventListenerConfig {
  /**
   * @type {EventHandlerBase~eventClb}
   */
  #callback
  /**
   * @type {SymbolStringArray}
   */
  #events
  /**
   * @type {boolean}
   */
  #active
  /**
   * @type {?EventHandlerBase~guardClb}
   */
  #guard

  /**
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   */
  constructor(events, callback, active = true, guard = null) {
    this.#events = assertInstanceOf(events, SymbolStringArray, 'SymbolStringArray')
    this.#callback = TypeCheck.assertIsArrowFunction(callback)
    this.#active = TypeCheck.assertIsBoolean(active)
    this.#guard = TypeCheck.assertIsArrowFunctionOrNull(guard)
  }


  /**
   * @return {SymbolStringArray}
   */
  events() {
    return this.#events;
  }

  /**
   * @return {EventHandlerBase~eventClb}
   */
  callback() {
    return this.#callback;
  }

  /**
   * @return {boolean}
   */
  active() {
    return this.#active;
  }

  /**
   * @return {?EventHandlerBase~guardClb}
   */
  guard() {
    return this.#guard;
  }

  /**
   * @param {boolean} active
   * @return {EventListenerConfig}
   */
  withActive(active) {
    return EventListenerConfig.create(this.events(), this.callback(), active, this.guard())
  }

  /**
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   * @constructor
   * @readonly
   * @return {EventListenerConfig}
   */
  static create(events, callback, active = true, guard = null) {
    return deepFreezeSeal(new this(events, callback, active, guard))
  }
}
