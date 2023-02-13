import {RequestEventHandler} from './RequestEventHandler.js'
import {OrderedEventHandler} from '../../../event-handler/index.js'

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
   * @param {function:Promise<*>} requestClb
   */
  get(requestID, requestClb) {
    return new Promise((resolve, reject) => {
      if (this.#responses.has(requestID)) {
        const response = this.#responses.get(requestID)
        resolve.call(null, response)
        return
      }
      const listener = this.on().requested(requestID, () => {
        resolve.call(null, this.#responses.get(requestID))
        this.#orderedEventHandler.removeEventListener(listener)
      })
      if (!this.#requests.has(requestID)) {
        this.#requests.set(requestID, true)
        requestClb.call(null)
          .then(response => {
            this.postResponse(requestID, response)
          })
          .catch((e) => {
            this.#orderedEventHandler.removeEventListener(listener)
            this.#requests.delete(requestID)
            reject.call(null, e)
          })
      }
    })
  }

  postResponse(id, response) {
    this.#responses.set(id, response)
    this.#dispatchRequested(id)
    return this.#responses.get(id)
  }

  #dispatchRequested(id) {
    this.#orderedEventHandler.dispatch(id, {})
  }
}