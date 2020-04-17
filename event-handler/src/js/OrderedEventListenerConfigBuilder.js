import {OrderedEventListenerConfig} from './OrderedEventListenerConfig'
import {EventListenerConfigBuilder} from './EventListenerConfigBuilder'

/**
 * @class
 * @extends {EventListenerConfigBuilder}
 */
export class OrderedEventListenerConfigBuilder extends EventListenerConfigBuilder {
  /**
   *
   * @param {SymbolStringArray} events
   */
  constructor(events) {
    super(events)
    /**
     *
     * @params {number}
     * @protected
     */
    this._priority = 100
  }

  /**
   *
   * @param {number} priority
   * @return {this}
   */
  priority(priority) {
    this._priority = priority
    return this
  }

  /**
   *
   * @return {OrderedEventListenerConfig}
   */
  build() {
    return OrderedEventListenerConfig.create(this._events, this._callback, this._priority)
  }
}
