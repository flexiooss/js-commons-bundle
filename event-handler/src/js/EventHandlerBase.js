import {assert, assertInstanceOf, isFunction, isNull} from './__import__assert.js'
import {UID, Sequence} from './__import__js-helpers.js'
import {EventListenerConfig} from './EventListenerConfig.js'
import {StringArray} from './__import__flex-types.js'
import {EventListenerConfigBuilder} from "./EventListenerConfigBuilder.js";


/**
 * @callback EventHandlerBase~eventClb
 * @param {?Object} payload
 * @param {(string|Symbol)} eventName
 * @param {string} executionId
 */

/**
 * @callback EventHandlerBase~guardClb
 * @param {?Object} payload
 * @return {boolean}
 */

export class EventHandlerBase {
  /**
   * @type {?DispatchExecution}
   */
  #currentExecution = null
  /**
   * @type {Sequence}
   */
  #sequenceID = new Sequence(UID())
  /**
   * @type {boolean}
   */
  #isDispatching = false

  /**
   * @param {Number} [maxExecution=100]
   */
  constructor(maxExecution = 100) {
    /**
     * @type {number}
     * @protected
     */
    this._maxExecution = maxExecution
    /**
     * @params {Map<(String|Symbol), Map<(String|Symbol), EventListenerConfig>>}
     * @protected
     */
    this._listeners = new Map()
    /**
     * @params {Map<(String|Symbol), Map<(String|Symbol), EventListenerConfig>>}
     * @protected
     */
    this._asyncListeners = new Map()

    /**
     * @type {Map<string, Map<string,DispatchExecution>>}
     * @private
     */
    this._executionQueue = new Map()
  }

  /**
   * @param {(String|Symbol)} event
   * @param {Object} payload
   * @param {?string} [token=null]
   */
  dispatch(event, payload, token = null) {
    if (this._listeners.has(event) || this._asyncListeners.has(event)) {

      /**
       * @type {DispatchExecution}
       */
      const dispatchExecution = this._prepareDispatch(event, payload, token)

      try {
        dispatchExecution.listeners()
          .forEach(
            /**
             * @param {EventListenerConfig} eventListenerConfig
             * @param {string} listenerToken
             */
            (eventListenerConfig, listenerToken) => {
              if (eventListenerConfig.active() && (isNull(eventListenerConfig.guard()) || eventListenerConfig.guard().call(null, payload))) {
                this._invokeCallback(dispatchExecution, listenerToken, eventListenerConfig.callback(), eventListenerConfig.once())
              }
            }
          )
        if (dispatchExecution.asyncListeners().size) {
          let asyncListeners = []
          dispatchExecution.asyncListeners()
            .forEach(
              /**
               * @param {EventListenerConfig} eventListenerConfig
               * @param {string} listenerToken
               */
              (eventListenerConfig, listenerToken) => {
                asyncListeners.push((() => {
                  return new Promise((ok, ko) => {
                    ok()
                    if (eventListenerConfig.active() && (isNull(eventListenerConfig.guard()) || eventListenerConfig.guard().call(null, payload))) {
                      this._invokeCallback(dispatchExecution, listenerToken, eventListenerConfig.callback(), eventListenerConfig.once())
                    }
                  })
                })())

              }
            )
          Promise.all(asyncListeners)
        }
      } finally {
        this._stopDispatch(dispatchExecution)
      }
    }
  }

  /**
   * @protected
   * @param {DispatchExecution} dispatchExecution
   * @param {String} listenerToken
   * @param {EventHandlerBase~eventClb} clb
   * @param {boolean} removeListenerBeforeCallabck
   */
  _invokeCallback(dispatchExecution, listenerToken, clb, removeListenerBeforeCallabck) {
    if (dispatchExecution.startExecution(listenerToken)) {
      try {
        try {
          if (removeListenerBeforeCallabck) {
            this.removeEventListener(dispatchExecution.event(), listenerToken)
          }
        } catch (e) {
          console.error(e)
        } finally {
          clb.call(null, dispatchExecution.payload(), dispatchExecution.event(), dispatchExecution.token())
        }
      } finally {
        dispatchExecution.finishExecution(listenerToken)
      }
    }
  }

  /**
   * @return {string}
   */
  nextID() {
    return this.#sequenceID.nextID()
  }

  /**
   * @param {EventListenerConfig|function(EventListenerConfigBuilder):EventListenerConfig} eventListenerConfig
   * @returns {(String|StringArray)}
   */
  addEventListener(eventListenerConfig) {
    if (isFunction(eventListenerConfig)) {
      eventListenerConfig = eventListenerConfig.call(null, new EventListenerConfigBuilder())
    }
    assertInstanceOf(eventListenerConfig , EventListenerConfig, 'EventListenerConfig')
    const ids = new StringArray()

    for (const event of eventListenerConfig.events()) {
      const id = this.nextID()
      this._ensureHaveAsyncListenersMap(event)
      this._ensureHaveListenersMap(event)
      if (eventListenerConfig.async()) {
        this._asyncListeners.get(event).set(id, eventListenerConfig)
      } else {
        this._listeners.get(event).set(id, eventListenerConfig)
      }
      ids.push(id)
    }

    return ids.length > 1 ? ids : ids.first()
  }

  /**
   * @param {(string|Symbol)} event
   * @protected
   */
  _ensureHaveListenersMap(event) {
    if (!(this._listeners.has(event))) {
      this._listeners.set(event, new Map())
    }
  }

  /**
   * @param {(string|Symbol)} event
   * @protected
   */
  _ensureHaveAsyncListenersMap(event) {
    if (!(this._asyncListeners.has(event))) {
      this._asyncListeners.set(event, new Map())
    }
  }

  /**
   * @param {(String|Symbol)} event of Listener
   * @param {String} [token=null]
   * @throws AssertionError
   * @return {boolean}
   */
  removeEventListener(event, token = null) {
    let removed = false
    if (this._listeners.has(event)) {
      if (isNull(token)) {
        this._listeners.get(event).forEach((v, k) => {
          this._listeners.get(event).delete(k)
          if (!isNull(v.onRemoveCallback())) {
            v.onRemoveCallback().call(null)
          }
        })
        removed = true
      } else {
        if (this._listeners.has(event)) {
          if (this._listeners.get(event).has(token)) {
            const config = this._listeners.get(event).get(token)
            this._listeners.get(event).delete(token)
            if (!isNull(config.onRemoveCallback())) {
              config.onRemoveCallback().call(null)
            }
          }
          return true
        }
      }
    }
    if (this._asyncListeners.has(event)) {
      if (isNull(token)) {
        this._asyncListeners.get(event).forEach((v, k) => {
          this._asyncListeners.get(event).delete(k)
          if (!isNull(v.onRemoveCallback())) {
            v.onRemoveCallback().call(null)
          }
        })
        removed = true
      } else {
        if (this._asyncListeners.has(event)) {
          if (this._asyncListeners.get(event).has(token)) {
            const config = this._asyncListeners.get(event).get(token)
            this._asyncListeners.get(event).delete(token)
            if (!isNull(config.onRemoveCallback())) {
              config.onRemoveCallback().call(null)
            }
          }
          return true
        }
      }
    }
    return removed
  }

  /**
   * @param {(String|Symbol)} event
   * @param {String} token
   * @throws AssertionError
   * @return {boolean}
   */
  disableEventListener(event, token = null) {
    if (this._listeners.has(event)) {
      if (this._listeners.has(event) && this._listeners.get(event).has(token) && this._listeners.get(event).get(token).active()) {
        /**
         * @type {EventListenerConfig}
         */
        const current = this._listeners.get(event).get(token)
        this._listeners.get(event).set(
          token,
          current.withActive(false)
        )
        return true
      }
    }
    if (this._asyncListeners.has(event)) {
      if (this._asyncListeners.has(event) && this._asyncListeners.get(event).has(token) && this._asyncListeners.get(event).get(token).active()) {
        /**
         * @type {EventListenerConfig}
         */
        const current = this._asyncListeners.get(event).get(token)
        this._asyncListeners.get(event).set(
          token,
          current.withActive(false)
        )
        return true
      }
    }
    return false
  }

  /**
   * @param {(String|Symbol)} event
   * @param {String} token
   * @throws AssertionError
   * @return {boolean}
   */
  enableEventListener(event, token) {
    if (this._listeners.has(event)) {
      if (this._listeners.has(event) && this._listeners.get(event).has(token) && !this._listeners.get(event).get(token).active()) {
        /**
         * @type {EventListenerConfig}
         */
        const current = this._listeners.get(event).get(token)
        this._listeners.get(event).set(
          token,
          current.withActive(true)
        )
        return true
      }
    }

    if (this._asyncListeners.has(event)) {
      if (this._asyncListeners.has(event) && this._asyncListeners.get(event).has(token) && !this._asyncListeners.get(event).get(token).active()) {
        /**
         * @type {EventListenerConfig}
         */
        const current = this._asyncListeners.get(event).get(token)
        this._asyncListeners.get(event).set(
          token,
          current.withActive(true)
        )
        return true
      }
    }
    return false
  }

  /**
   * @param {(String|Symbol)} event of Listener
   * @param {String} token
   * @returns {boolean}
   */
  hasEventListener(event, token) {
    return ((this._listeners.has(event)) && (this._listeners.get(event).has(token))) || ((this._asyncListeners.has(event)) && (this._asyncListeners.get(event).has(token)))
  }

  /**
   * @param {(String|Symbol)} event of Listener
   * @param {Object} payload
   * @param {?string} token
   * @return {DispatchExecution}
   * @private
   */
  _prepareDispatch(event, payload, token) {
    /**
     * @type {DispatchExecution}
     */
    const execution = new DispatchExecution(
      event,
      this.nextID(),
      payload,
      this._listeners.get(event),
      this._asyncListeners.get(event),
      token
    )

    this
      ._ensureHaveExecutionEventMap(event)
      ._ensureMaxExecution(event)
      ._executionQueue
      .get(event)
      .set(execution.id(), execution)

    this.#isDispatching = true
    this.#currentExecution = execution
    return execution
  }

  /**
   *
   * @param {(string|Symbol)} event
   * @return {EventHandlerBase}
   * @protected
   */
  _ensureHaveExecutionEventMap(event) {
    if (!(this._executionQueue.has(event))) {
      this._executionQueue.set(event, new Map())
    }
    return this
  }

  /**
   * @param {(string|Symbol)} event
   * @return {EventHandlerBase}
   * @protected
   */
  _ensureMaxExecution(event) {
    if (this._executionQueue.get(event).size + 1 > this._maxExecution) {
      throw new Error('MAX EXECUTION ' + this._maxExecution + ' FOR : ' + event)
    }
    return this
  }

  /**
   * @param {DispatchExecution} execution
   * @return {this}
   * @protected
   */
  _stopDispatch(execution) {
    this.#currentExecution = null
    this.#isDispatching = false
    if (this._executionQueue.has(execution.event())) {
      this._executionQueue.get(execution.event()).delete(execution.id())
    }
    return this
  }

  /**
   * @return {boolean}
   */
  isDispatching() {
    return this.#isDispatching
  }

  /**
   * @return {this}
   */
  clear() {
    this._listeners.clear()
    this._asyncListeners.clear()
    if (!isNull(this.#currentExecution)) {
      this.#currentExecution.remove()
    }
    this._executionQueue.clear()
    return this
  }

  /**
   * @return {?DispatchExecution}
   */
  currentExecution() {
    return this.#currentExecution
  }
}


class DispatchExecution {

  /**
   * @type {string}
   */
  #event
  /**
   * @type {string}
   */
  #id
  /**
   * @type {?string}
   */
  #token
  /**
   * @type {*}
   */
  #payload
  /**
   * @type  {Map<string,EventListenerConfig>}
   */
  #listeners
  /**
   * @type  {Map<string,EventListenerConfig>}
   */
  #asyncListeners
  /**
   * @type {Set<string>}
   */
  #pending
  /**
   * @type {boolean}
   */
  #removed = false
  /**
   * @type {?string}
   */
  #executing = null

  /**
   * @param {string} event
   * @param {string} id
   * @param {*} payload
   * @param {Map<string,EventListenerConfig>} listeners
   * @param {Map<string,EventListenerConfig>} asyncListeners
   * @param {?string} token
   */
  constructor(event, id, payload, listeners, asyncListeners, token) {
    this.#event = event
    this.#id = id
    this.#token = token
    this.#payload = payload
    this.#listeners = listeners
    this.#asyncListeners = asyncListeners
    this.#pending = this.#initPending()
  }

  /**
   * @return  {Map<string,EventListenerConfig>}
   */
  listeners() {
    return this.#listeners
  }

  /**
   * @return  {Map<string,EventListenerConfig>}
   */
  asyncListeners() {
    return this.#asyncListeners
  }

  /**
   * @return {string}
   */
  event() {
    return this.#event
  }

  /**
   * @return {string}
   */
  id() {
    return this.#id
  }

  /**
   * @return {*}
   */
  payload() {
    return this.#payload
  }

  /**
   * @return {string}
   */
  token() {
    return this.#token ?? this.#id
  }

  /**
   * @return {Set<string>}
   */
  #initPending() {
    const pending = new Set()
    this.#listeners.forEach((v, k) => {
      pending.add(k)
    })
    this.#asyncListeners.forEach((v, k) => {
      pending.add(k)
    })
    return pending
  }

  /**
   * @param {string} listenerToken
   * @return {boolean}
   */
  isPending(listenerToken) {
    return this.#pending.has(listenerToken)
  }

  /**
   * @param {string} listenerToken
   * @return {boolean}
   */
  startExecution(listenerToken) {
    if (this.isRemoved()) {
      return false
    }
    if (this.isPending(listenerToken)) {
      this.#executing = listenerToken
      return true
    }
    return false
  }

  /**
   * @param {string} listenerToken
   * @return {DispatchExecution}
   */
  finishExecution(listenerToken) {
    this.#executing = null
    this.#pending.delete(listenerToken)
    return this
  }

  /**
   * @param {string} listenerToken
   * @return {boolean}
   */
  isExecuting(listenerToken) {
    return this.#executing === listenerToken
  }

  /**
   * @param {string} listenerToken
   * @return {boolean|boolean}
   */
  isHandled(listenerToken) {
    return !this.isExecuting(listenerToken) && !this.isPending(listenerToken)
  }


  /**
   * @return {boolean}
   */
  isRemoved() {
    return this.#removed === true
  }

  remove() {
    this.#removed = true
    this.#pending.clear()
  }
}


