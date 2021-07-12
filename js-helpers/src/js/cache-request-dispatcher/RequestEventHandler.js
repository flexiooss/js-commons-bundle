import {assertType, isFunction, isString, isSymbol} from '../../../../assert'
import {OrderedEventListenerConfigBuilder} from '../../../../event-handler'

export class RequestEventHandler {
  /**
   * @type {function(OrderedEventListenerConfig):string}
   */
  #subscriber

  /***
   *
   * @param {function(OrderedEventListenerConfig):string} subscriber
   */
  constructor(subscriber) {
    assertType(isFunction(subscriber), 'PublicEventHandler: `subscriber` should be a function')
    this.#subscriber = subscriber
  }

  /**
   *
   * @param {(string)}event
   * @param {function(payload: *, ...args:*)} clb
   * @param {...*} args
   * @return {String}
   * @protected
   */
  _subscribeTo(event, clb, ...args) {
    assertType(
      isSymbol(event) || isString(event),
      'RequestEventHandler:_subscribe: `event` should be a string or symbol'
    )
    assertType(
      isFunction(clb),
      'RequestEventHandler:_subscribe: `clb` should be a function'
    )
    return this.#subscriber(
      OrderedEventListenerConfigBuilder
        .listen(event)
        .callback((payload) => {
          clb(payload, ...args)
        })
        .build()
    )
  }

  /**
   * @param {string} value
   * @param {function()} clb
   * @return {String}
   */
  requested(value, clb) {
    return this._subscribeTo(value, clb)
  }
}
