import {EventListenerConfig} from './EventListenerConfig'
import {SymbolStringArray} from './__import__extended-flex-types'

export class EventListenerConfigBuilder {
  /**
   *
   * @param {SymbolStringArray} events
   */
  constructor(events) {
    /**
     *
     * @type {SymbolStringArray}
     * @protected
     */
    this._events = events
    /**
     *
     * @type {EventHandlerBase~eventClb}
     * @protected
     */
    this._callback = () => true
  }

  /**
   *
   * @param {...(String|Symbol)} events
   * @return {this}
   * @constructor
   */
  static listen(...events) {
    return new this(new SymbolStringArray(...events))
  }

  /**
   *
   * @param {EventHandlerBase~eventClb} clb
   * @return {this}
   */
  callback(clb) {
    this._callback = clb
    return this
  }

  /**
   *
   * @return {EventListenerConfig}
   */
  build() {
    return EventListenerConfig.create(
      this._events,
      this._callback
    )
  }
}
