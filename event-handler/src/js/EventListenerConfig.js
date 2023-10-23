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
   * @type {boolean}
   */
  #async
  /**
   * @type {boolean}
   */
  #once
  /**
   * @type {?EventHandlerBase~guardClb}
   */
  #guard

  /**
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {boolean} once
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   * @param {boolean} [async=false]
   */
  constructor(events, callback, once, active = true, guard = null, async = false) {
    this.#events = assertInstanceOf(events, SymbolStringArray, 'SymbolStringArray')
    this.#callback = TypeCheck.assertIsArrowFunction(callback)
    this.#once = TypeCheck.assertIsBoolean(once)
    this.#active = TypeCheck.assertIsBoolean(active)
    this.#guard = TypeCheck.assertIsArrowFunctionOrNull(guard)
    this.#async = TypeCheck.assertIsBoolean(async)
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
   * @return {boolean}
   */
  async() {
    return this.#async;
  }

  /**
   * @return {boolean}
   */
  once() {
    return this.#once;
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
    return EventListenerConfig.create(this.events(), this.callback(), this.once(), active, this.guard(), this.async())
  }

  /**
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {boolean} once
   * @param {boolean} [active=true]
   * @param {?EventHandlerBase~guardClb} [guard=null]
   * @param {boolean} [async=false]
   * @constructor
   * @readonly
   * @return {EventListenerConfig}
   */
  static create(events, callback, once, active = true, guard = null, async = false) {
    return deepFreezeSeal(new this(events, callback, once, active, guard, async))
  }
}
