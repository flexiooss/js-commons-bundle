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
   * @type {?function()[]}
   */
  #toExecute = []

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
   * @param {?function()} [callback=null]
   */
  invokeAndEnsure(callback = null) {
    TypeCheck.assertIsFunctionOrNull(callback)

    if (isNull(this.#timer)) {
      this.#now = Date.now()
      if ((this.#last && (this.#now > this.#last + this.#delay)) || isNull(this.#last)) {
        if (!isNull(callback)) callback()

        this.#last = this.#now
        this.#timer = setTimeout(
          () => {
            this.#timer = null
            if (this.#toExecute.length) {
              const clb = this.#toExecute[this.#toExecute.length - 1]
              this.#toExecute = []
              this.#last = Date.now()
              clb()
              this.invokeAndEnsure()
            }
          },
          this.#delay
        )
      }
    } else {
      this.#toExecute.push(callback)
      if (this.#toExecute.length > 2) {
        this.#toExecute.shift()
      }
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
