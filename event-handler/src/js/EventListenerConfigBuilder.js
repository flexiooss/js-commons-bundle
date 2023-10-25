import {EventListenerConfig} from './EventListenerConfig.js'
import {SymbolStringArray} from './__import__extended-flex-types.js'

export class EventListenerConfigBuilder {
  constructor() {
    /**
     * @type {?SymbolStringArray}
     * @protected
     */
    this._events = null
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
    /**
     * @type {function()}
     * @protected
     */
    this._onRemoveCallback = null
  }

  /**
   * @param {...(string|Symbol)} value
   * @return {EventListenerConfigBuilder}
   */
  events(...value){
    this._events = new SymbolStringArray(...value)
    return this
  }

  /**
   * @param {...(String|Symbol)} events
   * @return {EventListenerConfigBuilder}
   * @constructor
   */
  static listen(...events) {
    return new this().events(...events)
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
   * @param {EventHandlerBase~eventClb} clb
   * @return {this}
   */
  onRemoveCallback(clb) {
    this._onRemoveCallback = clb
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
      this._onRemoveCallback,
      this._async
    )
  }
}
