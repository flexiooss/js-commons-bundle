import { isNull, TypeCheck} from '../../../assert/index.js'

export class LightOrDarkColor {
  /**
   * @type {?string}
   */
  #textColor = null
  /**
   * @type {?Color}
   */
  #color = null
  /**
   * @type {?number}
   */
  #hsp = null
  /**
   * @type {number}
   */
  #hspInflection = 127.5

  /**
   * @param {?string} color
   * @param {number} [hspInflection=170]
   */
  constructor(color, hspInflection = 170) {
    this.#textColor = TypeCheck.assertIsStringOrNull(color)
    this.#hspInflection = TypeCheck.assertIsNumber(hspInflection)
    if (!isNull(this.#textColor)) {
      this.#process()
    }
  }

  /**
   * @return {boolean}
   */
  isLight() {
    return !isNull(this.#hsp) ? this.#hsp > this.#hspInflection : false
  }

  /**
   * @return {boolean}
   */
  isDark() {
    return !isNull(this.#hsp) ? this.#hsp < this.#hspInflection : false
  }

  /**
   * @return {boolean}
   */
  isWhite() {
    return !isNull(this.#hsp) ? this.#hsp > 240 : false
  }

  /**
   * @return {LightOrDarkColor}
   */
  #process() {
    if (Color.isRGBFormat(this.#textColor)) {
      this.#color = Color.fromRGBColor(this.#textColor)
    } else {
      this.#color = Color.fromHEXColor(this.#textColor)
    }

    this.#hsp = this.#color.toHSP()
    return this
  }


}

export class Color {
  /**
   * @type {number}
   */
  #red
  /**
   * @type {number}
   */
  #green
  /**
   * @type {number}
   */
  #blue

  /**
   * @return {number}
   */
  red() {
    return this.#red
  }

  /**
   * @return {number}
   */
  green() {
    return this.#green
  }

  /**
   * @return {number}
   */
  blue() {
    return this.#blue
  }

  /**
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   */
  constructor(red, green, blue) {
    this.#red = red
    this.#green = green
    this.#blue = blue
  }

  /**
   * @param {string} color
   * @return {Color}
   */
  static fromRGBColor(color) {
    /**
     * @type {RegExpMatchArray}
     */
    let splitedColor = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

    return new Color(parseFloat(splitedColor[1]), parseFloat(splitedColor[2]), parseFloat(splitedColor[3]))
  }

  /**
   * @see http://gist.github.com/983661
   * @param {string} color
   * @return {Color}
   */
  static fromHEXColor(color) {
    let processedColor = +('0x' + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'
      ).slice(0, 6)
    )
    return new Color(processedColor >> 16, processedColor >> 8 & 255, processedColor & 255)
  }

  /**
   * @param {string} color
   * @return {boolean}
   */
  static isRGBFormat(color) {
    return new RegExp('^rgb').test(color)
  }

  /**
   * @see HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
   * @return {number}
   */
  toHSP() {
    return Math.sqrt(
      0.299 * Math.pow(this.red(), 2) +
      0.587 * Math.pow(this.green(), 2) +
      0.114 * Math.pow(this.blue(), 2)
    )
  }
}
