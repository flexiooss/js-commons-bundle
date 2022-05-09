import {isFunction, assert, assertInstanceOf, TypeCheck} from './__import__assert'
import {deepFreezeSeal} from './__import__js-generator-helpers'
import {SymbolStringArray} from './__import__extended-flex-types'

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
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {boolean} [active=true]
   */
  constructor(events, callback,active=true) {
    this.#events = assertInstanceOf(events,SymbolStringArray, 'SymbolStringArray')
    this.#callback = TypeCheck.assertIsArrowFunction(callback)
    this.#active = TypeCheck.assertIsBoolean(active)
    this.#events = events;
    this.#callback = callback;
    this.#active = active;
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
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {boolean} [active=true]
   * @constructor
   * @readonly {EventListenerConfig}
   */
  static create(events, callback, active=true) {
    return deepFreezeSeal(new this(events, callback, active))
  }
}
