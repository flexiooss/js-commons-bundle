import {assertType, isFunction, isNull, isNumber} from './__import__assert'

export class Throttle {
  /**
   *
   * @param {number} delay ms
   */
  constructor(delay) {
    assertType(
      isNumber(delay),
      'Throttle: `delay` should be a number'
    )
    /**
     *
     * @type {number}
     * @private
     */
    this.__delay = delay
    /**
     *
     * @type {?number}
     * @private
     */
    this.__now = null
    /**
     *
     * @type {?number}
     * @private
     */
    this.__last = null
    /**
     *
     * @type {?number}
     * @private
     */
    this.__timer = null
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

    this.__now = Date.now()

    if (isNull(this.__timer)) {

      this.__last = this.__now

      this.__timer = setTimeout(
        callback,
        this.__delay
      )
    }

    if ((this.__last && this.__now < this.__last + this.__delay)) {

      clearTimeout(this.__timer)

      this.__last = this.__now

      this.__timer = setTimeout(
        () => {
          this.__timer = null
          this.__last = null
          callback()
        },
        this.__delay
      )

    }
  }

}
