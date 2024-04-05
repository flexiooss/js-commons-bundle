export class ColorHelper {
  /**
   * @type {string}
   */
  #color

  /**
   * @param {string} color
   */
  constructor(color) {
    this.#color = color
  }

  /**
   * @param {number} percent
   * @return {string}
   */
  increaseBrightness(percent){
    let hex = this.#color.replace(/^\s*#|\s*$/g, '');

    if(hex.length == 3){
      hex = hex.replace(/(.)/g, '$1$1')
    }

    let red = parseInt(hex.slice(0, 2), 16)
    let  green = parseInt(hex.slice(2, 4), 16)
    let  blue = parseInt(hex.slice(4, 6), 16)

    return `#${this.#processFragment(red)}${this.#processFragment(green)}${this.#processFragment(blue)}`
  }

  #processFragment(fragment, percent) {
    return ((0|(1<<8) + fragment + (256 - fragment) * percent / 100).toString(16)).substr(1)
  }
}