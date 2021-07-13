import {RequestEventHandler} from './RequestEventHandler'
import {OrderedEventHandler} from '../../../../event-handler'

export class CacheRequestDispatcher {
  /**
   * @type {OrderedEventHandler}
   */
  #orderedEventHandler
  /**
   *
   * @type {Map<String, *>}
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
   * @param {Promise<*>} requestClb
   */
  get(requestID, requestClb) {
    return new Promise(resolver => {
      if (this.#responses.has(requestID)) {
        const response = this.#responses.get(requestID)
        resolver(response)
        return
      }
      const listener = this.on().requested(requestID, () => {
        resolver(this.#responses.get(requestID))
        this.#orderedEventHandler.removeEventListener(listener)
      })
      if (!this.#requests.has(requestID)) {
        this.#requests.set(requestID, true)
        requestClb.then((response => {
          this.#postResponse(requestID, response)
        }))
      }
    })
  }

  #postResponse(id, response) {
    this.#responses.set(id, response)
    this.#dispatchRequested(id)
    return this.#responses.get(id).clone()
  }

  #dispatchRequested(id) {
    this.#orderedEventHandler.dispatch(id, {})
  }
}