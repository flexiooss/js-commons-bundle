import {assertType, isFunction, isNull, isNumber} from './__import__assert'

export class ThrottleOnce {
  /**
   * @type {number}
   */
  #delay
  /**
   * @type {?number}
   */
  #now = null
  /**
   * @type {?number}
   */
  #last = null
  /**
   * @type {?number}
   */
  #timer = null
  
  /**
   *
   * @param {number} [delay=200] ms
   */
  constructor(delay = 200) {
    assertType(
      isNumber(delay),
      'Throttle: `delay` should be a number'
    )
    this.#delay = delay
    this.#now = null
    this.#last = null
    this.#timer = null
  }

  /**
   *
   * @param {Function} callback
   */
  invoke(callback) {

    assertType(
      isFunction(callback),
      'Throttle:invoke: `callback` should be a Function'
    )

    this.#now = Date.now()

    if (isNull(this.#timer)) {

      this.#last = this.#now

      this.#timer = setTimeout(
        callback,
        this.#delay
      )
    }

    if ((this.#last && this.#now < this.#last + this.#delay)) {

      clearTimeout(this.#timer)

      this.#last = this.#now
    }
  }

}
