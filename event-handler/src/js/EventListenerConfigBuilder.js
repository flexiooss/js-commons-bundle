import {EventListenerConfig} from './EventListenerConfig.js'
import {SymbolStringArray} from './__import__extended-flex-types.js'

export class EventListenerConfigBuilder {
  /**
   *
   * @param {SymbolStringArray} events
   */
  constructor(events) {
    /**
     * @type {SymbolStringArray}
     * @protected
     */
    this._events = events
    /**
     * @type {boolean}
     * @protected
     */
    this._active = true
    /**
     * @type {?EventHandlerBase~guardClb}
     * @protected
     */
    this._guard = null
    /**
     * @type {boolean}
     * @protected
     */
    this._once = false
    /**
     * @type {boolean}
     * @protected
     */
    this._async = false
    /**
     * @type {EventHandlerBase~eventClb}
     * @protected
     */
    this._callback = () => true
  }

  /**
   * @param {...(String|Symbol)} events
   * @return {EventListenerConfigBuilder}
   * @constructor
   */
  static listen(...events) {
    return new this(new SymbolStringArray(...events))
  }

  /**
   * @param {EventHandlerBase~eventClb} clb
   * @return {this}
   */
  callback(clb) {
    this._callback = clb
    return this
  }

  /**
   * @return {this}
   */
  once() {
    this._once = true
    return this
  }

  /**
   * @param {?EventHandlerBase~guardClb} clb
   * @return {this}
   */
  guard(clb) {
    this._guard = clb
    return this
  }

  /**
   * @return {this}
   */
  disabled() {
    this._active = false
    return this
  }
  /**
   * @return {this}
   */
  async(){
    this._async = true
    return this
  }

  /**
   * @return {EventListenerConfig}
   */
  build() {
    return EventListenerConfig.create(
      this._events,
      this._callback,
      this._once,
      this._active,
      this._guard,
      this._async
    )
  }
}
