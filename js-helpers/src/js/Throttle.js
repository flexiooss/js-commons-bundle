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
   * @type {?function()}
   */
  #toExecute = null

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

  invokeAndEnsure(callback) {
    TypeCheck.assertIsFunction(callback)
    if (isNull(this.#timer)) {

      this.#now = Date.now()
      this.#toExecute = null
      if ((this.#last && (this.#now > this.#last + this.#delay)) || isNull(this.#last)) {
        callback()
        this.#last = this.#now
        this.#timer = setTimeout(
          () => {
            this.#timer = null
            if (!isNull(this.#toExecute)) {
              this.invokeAndEnsure(this.#toExecute)
            }
          },
          this.#delay
        )
      }
    } else {
      this.#toExecute = callback
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
