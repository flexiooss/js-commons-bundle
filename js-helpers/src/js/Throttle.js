import {isNull, TypeCheck} from './__import__assert.js'

export class Throttle {
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
   * @param {number} delay ms
   */
  constructor(delay) {
    this.#delay = TypeCheck.assertIsNumber(delay)
  }

  /**
   * @param {Function} callback
   */
  invoke(callback) {
    TypeCheck.assertIsFunction(callback)
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
      this.#timer = setTimeout(
        () => {
          this.#timer = null
          this.#last = null
          callback()
        },
        this.#delay
      )

    }
  }

  /**
   * @param {Function} callback
   */
  invokeNow(callback) {
    TypeCheck.assertIsFunction(callback)
    this.#now = Date.now()

    if ((isNull(this.#timer) && ((this.#last && (this.#now > this.#last + this.#delay)) || isNull(this.#last)))) {
      callback()
      this.#last = this.#now
      this.#timer = setTimeout(
        () => {
          this.#timer = null
        },
        this.#delay
      )
    }
  }

}
