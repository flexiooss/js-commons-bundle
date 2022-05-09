import {isBoolean, assert, isNull} from './__import__assert'
import {UID, Sequence} from './__import__js-helpers'
import {EventListenerConfig} from './EventListenerConfig'
import {StringArray} from './__import__flex-types'


const _isDispatching_ = Symbol('_isDispatching_')
const _sequenceId_ = Symbol('_sequenceId_')


/**
 * @callback EventHandlerBase~eventClb
 * @param {Object} payload
 * @param {(string|Symbol)} eventName
 * @param {string} executionId
 */

export class EventHandlerBase {
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
     * @type {Map<string, Map<string,DispatchExecution>>}
     * @private
     */
    this._executionQueue = new Map()

    this[_sequenceId_] = new Sequence(UID())
    /**
     *
     * @type {?DispatchExecution}
     * @private
     */
    this.__currentExecution = null

    /**
     * @property {boolean}
     * @name EventHandlerBase#Symbol(_isDispatching_)
     * @private
     */
    let _isDispatching = false
    Object.defineProperty(this,
      _isDispatching_,
      {
        enumerable: false,
        configurable: false,
        get: () => _isDispatching,
        set: (v) => {
          assert(isBoolean(v),
            '_isDispatching argument should be a Boolean'
          )
          _isDispatching = v
        }
      })
  }

  /**
   * @param {(String|Symbol)} event
   * @param {Object} payload
   */
  dispatch(event, payload) {
    if (this._listeners.has(event)) {

      /**
       *
       * @type {DispatchExecution}
       */
      const dispatchExecution = this._prepareDispatch(event, payload)

      try {
        dispatchExecution.listeners()
          .forEach(
            /**
             * @param {EventListenerConfig} eventListenerConfig
             * @param {string} listenerToken
             */
            (eventListenerConfig, listenerToken) => {
              if (eventListenerConfig.active()) {
                this._invokeCallback(dispatchExecution, listenerToken, eventListenerConfig.callback())
              }
            }
          )
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
   */
  _invokeCallback(dispatchExecution, listenerToken, clb) {
    if (dispatchExecution.startExecution(listenerToken)) {
      try {
        clb(dispatchExecution.payload(), dispatchExecution.event(), dispatchExecution.id())
      } finally {
        dispatchExecution.finishExecution(listenerToken)
      }
    }
  }

  /**
   * @return {string}
   */
  nextID() {
    return this[_sequenceId_].nextID()
  }

  /**
   * @param {EventListenerConfig} eventListenerConfig
   * @returns {(String|StringArray)} externalChooserPublic
   */
  addEventListener(eventListenerConfig) {
    assert(eventListenerConfig instanceof EventListenerConfig,
      'EventHandlerBase:addEventListener: ̀`eventListenerParam` argument assert be an instance of EventListenerConfig'
    )
    const ids = new StringArray()

    for (const event of eventListenerConfig.events()) {
      this._ensureHaveListenersMap(event)
      const id = this.nextID()

      this._listeners.get(event)
        .set(id, eventListenerConfig)
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
   * @param {(String|Symbol)} event of Listener
   * @param {String} [token=null]
   * @throws AssertionError
   * @return {boolean}
   */
  removeEventListener(event, token = null) {
    if (this._listeners.has(event)) {
      if (isNull(token)) {
        this._listeners.delete(event)
        return true
      } else {
        if (this._listeners.has(event)) {
          this._listeners.get(event).delete(token)
          return true
        }
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
  disableEventListener(event, token = null) {
    if (this._listeners.has(event)) {
      if (this._listeners.has(event) && this._listeners.get(event).has(token)) {
        /**
         * @type {EventListenerConfig}
         */
        const current = this._listeners.get(event).get(token)
        this._listeners.get(event).set(
          token,
          EventListenerConfig.create(
            current.events(),
            current.callback,
            false
          )
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
      if (this._listeners.has(event) && this._listeners.get(event).has(token)) {
        /**
         * @type {EventListenerConfig}
         */
        const current = this._listeners.get(event).get(token)
        this._listeners.get(event).set(
          token,
          EventListenerConfig.create(
            current.events(),
            current.callback,
            true
          )
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
    return (this._listeners.has(event)) && (this._listeners.get(event).has(token))
  }

  /**
   * @param {(String|Symbol)} event of Listener
   * @param {Object} payload
   * @return {DispatchExecution}
   * @private
   */
  _prepareDispatch(event, payload) {

    const execution = new DispatchExecution(
      event,
      this.nextID(),
      payload,
      this._listeners.get(event)
    )

    this
      ._ensureHaveExecutionEventMap(event)
      ._ensureMaxExecution(event)
      ._executionQueue
      .get(event)
      .set(execution.id(), execution)

    this[_isDispatching_] = true
    this.__currentExecution = execution
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
   *
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
   *
   * @param {DispatchExecution} execution
   * @return {this}
   * @protected
   */
  _stopDispatch(execution) {
    this.__currentExecution = null
    this[_isDispatching_] = false
    if (this._executionQueue.has(execution.event())) {
      this._executionQueue.get(execution.event()).delete(execution.id())
    }
    return this
  }

  /**
   * @return {boolean}
   */
  isDispatching() {
    return this[_isDispatching_]
  }

  /**
   * @return {this}
   */
  clear() {
    this._listeners.clear()
    if (!isNull(this.__currentExecution)) {
      this.__currentExecution.remove()
    }
    this._executionQueue.clear()
    return this
  }

  /**
   * @return {?DispatchExecution}
   */
  currentExecution() {
    return this.__currentExecution
  }
}


class DispatchExecution {

  /**
   * @param {string} event
   * @param {string} id
   * @param {*} payload
   * @param {Map<string,EventListenerConfig>} listeners
   */
  constructor(event, id, payload, listeners) {

    /**
     * @type {string}
     * @private
     */
    this.__event = event
    /**
     * @type {string}
     * @private
     */
    this.__id = id
    /**
     * @type {*}
     * @private
     */
    this.__payload = payload
    /**
     * @type  {Map<string,EventListenerConfig>}
     * @private
     */
    this.__listeners = listeners
    /**
     *
     * @type {Set<string>}
     * @private
     */
    this.__pending = this.__initPending()
    /**
     * @type {boolean}
     * @private
     */
    this.__removed = false

  }

  /**
   * @return  {Map<string,EventListenerConfig>}
   */
  listeners() {
    return this.__listeners
  }

  /**
   * @return {string}
   */
  event() {
    return this.__event
  }

  /**
   * @return {string}
   */
  id() {
    return this.__id
  }

  /**
   * @return {*}
   */
  payload() {
    return this.__payload
  }

  /**
   * @return {Set<string>}
   * @private
   */
  __initPending() {
    const pending = new Set()
    this.__listeners.forEach((v, k) => {
      pending.add(k)
    })
    return pending
  }

  /**
   * @param {string} listenerToken
   * @return {boolean}
   */
  isPending(listenerToken) {
    return this.__pending.has(listenerToken)
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
      this.__executing = listenerToken
      return true
    }
    return false
  }

  /**
   * @param {string} listenerToken
   * @return {DispatchExecution}
   */
  finishExecution(listenerToken) {
    this.__executing = null
    this.__pending.delete(listenerToken)
    return this
  }

  /**
   * @param {string} listenerToken
   * @return {boolean}
   */
  isExecuting(listenerToken) {
    return this.__executing === listenerToken
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
    return this.__removed === true
  }

  remove() {
    this.__removed = true
    this.__pending.clear()
  }
}


