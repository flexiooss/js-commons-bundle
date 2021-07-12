import {RequestEventHandler} from './RequestEventHandler'
import {OrderedEventHandler} from '../../../../event-handler'

export class CacheRequestDispatcher {
  /**
   * @type {OrderedEventHandler}
   */
  #orderedEventHandler
  /**
   *
   * @type {Map<String, Response>}
   */
  #responses = new Map()
  /**
   *
   * @type {Map<String, boolean>}
   */
  #requests = new Map()

  constructor() {
    this.#orderedEventHandler = new OrderedEventHandler()
  }

  /**
   * @return {RequestEventHandler}
   */
  on() {
    return new RequestEventHandler(a => this.#orderedEventHandler.addEventListener(a))
  }

  /**
   * @param {string} requestID
   * @param {function(Response)} requestClb
   */
  get(requestID, requestClb) {
    return new Promise(resolver => {
      if (this.#responses.has(requestID)) {
        const response = this.#responses.get(requestID).clone()
        resolver(response)
        return
      }
      const listener = this.on().requested(requestID, () => {
        resolver(this.#responses.get(requestID).clone())
        this.#orderedEventHandler.removeEventListener(listener)
      })
      if (!this.#requests.has(requestID)) {
        this.#requests.set(requestID, true)
        requestClb.call(null)
      }
    })
  }

  postResponse(id, response) {
    this.#responses.set(id, response)
    this.#dispatchRequested(id)
    return this.#responses.get(id).clone()
  }

  #dispatchRequested(id) {
    this.#orderedEventHandler.dispatch(id, {})
  }
}