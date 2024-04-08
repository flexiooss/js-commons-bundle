import { isNull, TypeCheck} from '../../../assert/index.js'
import {ColorHelper} from './ColorHelper.js'

export class LightOrDarkColor {
  /**
   * @type {?string}
   */
  #textColor = null
  /**
   * @type {?ColorHelper}
   */
  #colorHelper

  /**
   * @param {?string} color
   */
  constructor(color) {
    this.#textColor = TypeCheck.assertIsStringOrNull(color)
    this.#colorHelper = new ColorHelper(this.#textColor)
  }

  /**
   * @return {boolean}
   */
  isLight() {
    return this.#colorHelper.isLight()
  }

  /**
   * @return {boolean}
   */
  isDark() {
    return this.#colorHelper.isDark()
  }

  /**
   * @return {boolean}
   */
  isWhite() {
    return this.#colorHelper.isWhite()
  }


}
