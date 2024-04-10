import {isEmpty, isNull, isUndefined} from '../../../assert/index.js'

const CACHE = new Map()


/** Regular expression for valid CSS number */
const cssNumberMatcher = /[+-]?(?=\.\d|\d)\d*(?:\.\d+)?(?:[eE][+-]?\d+)?/.source
/** Regular expression for color component separator */
const separatorMatcher = /(?=[,\s])\s*(?:,\s*)?/.source
/** Regular expression for alpha separator */
const alphaSeparatorMatcher = /\s*[,\/]\s*/.source

const hexPattern = /[0-9a-fA-F]/.source

export class ColorPatterns {

  /**
   * @return {RegExp}
   */
  static hslPattern() {
    return new RegExp(
      `hsla?\\(\\s*(${cssNumberMatcher}(?:deg|rad|grad|turn)?)${separatorMatcher}(${cssNumberMatcher}%)${separatorMatcher}(${cssNumberMatcher}%)(?:${alphaSeparatorMatcher}(${cssNumberMatcher}%?))?\\s*\\)`,
      'i',
    )
  }

  /**
   * @return {RegExp}
   */
  static rgbPattern() {
    return new RegExp(
      `rgba?\\(\\s*(${cssNumberMatcher}%?)${separatorMatcher}(${cssNumberMatcher}%?)${separatorMatcher}(${cssNumberMatcher}%?)(?:${alphaSeparatorMatcher}(${cssNumberMatcher}%?))?\\s*\\)`,
      'i',
    )
  }

  /**
   * @return {RegExp}
   */
  static hexPattern() {
    return new RegExp(
      `(${hexPattern}{2})(${hexPattern}{2})(${hexPattern}{2})(${hexPattern}{2})?`,
      'i',
    )
  }

  /**
   * @return {RegExp}
   */
  static shortHexPattern() {
    return new RegExp(
      `(${hexPattern})(${hexPattern})(${hexPattern})(${hexPattern})?`,
      'i',
    )
  }

  /**
   * @param {string} hue
   * @return {number}
   */
  static formatHue(hue) {
    const huePattern = new RegExp(
      `(${cssNumberMatcher})(deg|rad|grad|turn)?`,
      'i'
    )
    const match = hue.match(huePattern)
    if (match && match.length > 0) {
      let hueValue = parseFloat(match[1])
      if (match[2]) {
        switch (match[2]) {
          case 'rad':
            hueValue = hueValue * (180 / Math.PI)
            break
          case 'grad':
            hueValue = hueValue * 0.9
            break
          case 'turn':
            hueValue = hueValue * 360
            break
        }
      }
      hueValue = Math.abs(hueValue)
      hueValue = Math.floor(hueValue)
      if (hueValue >= 360) {
        hueValue = hueValue % 360
      }

      return hueValue
    }

    return 0
  }

  /**
   * @param {string} cssNumber
   * @return {number}
   */
  static formatPercentNumber(cssNumber) {
    const cssNumberPattern = new RegExp(
      `(${cssNumberMatcher})(%)?`,
      'i'
    )
    const match = cssNumber.match(cssNumberPattern)
    if (match && match.length > 0) {
      let cssNumberValue = parseFloat(match[1])
      if (!match[2]) {
        return 0
      }

      cssNumberValue = Math.abs(cssNumberValue)
      cssNumberValue = Math.floor(cssNumberValue)
      if (cssNumberValue > 100) {
        const isZero = cssNumberValue === 0
        cssNumberValue = cssNumberValue % 100
        if (cssNumberValue === 0 && !isZero) {
          cssNumberValue = 100
        }
      }

      cssNumberValue = Math.abs(cssNumberValue)
      cssNumberValue = Math.floor(cssNumberValue)

      return cssNumberValue
    }

    return 0
  }


  /**
   * @param {string} cssNumber
   * @return {number}
   */
  static formatRGBSegment(cssNumber) {
    const cssNumberPattern = new RegExp(
      `(${cssNumberMatcher})(%)?`,
      'i'
    )
    const match = cssNumber.match(cssNumberPattern)
    if (match && match.length > 0) {
      let cssNumberValue = parseFloat(match[1])
      if (match[2]) {
        cssNumberValue = Math.abs(cssNumberValue)
        cssNumberValue = Math.floor(cssNumberValue)
        if (cssNumberValue > 100) {
          const isZero = cssNumberValue === 0
          cssNumberValue = cssNumberValue % 100
          if (cssNumberValue === 0 && !isZero) {
            cssNumberValue = 100
          }
        }

        cssNumberValue = cssNumberValue / 100 * 255
      }

      cssNumberValue = Math.abs(cssNumberValue)
      cssNumberValue = Math.floor(cssNumberValue)

      return cssNumberValue
    }

    return 0
  }

  /**
   * @param {string} cssNumber
   * @return {number}
   */
  static formatAlpha(cssNumber) {
    if (isUndefined(cssNumber) || isEmpty(cssNumber)) {
      return 1
    }

    const cssNumberPattern = new RegExp(
      `(${cssNumberMatcher})(%)?`,
      'i'
    )
    const match = cssNumber.match(cssNumberPattern)
    if (match && match.length > 0) {
      let cssNumberValue = parseFloat(match[1])
      if (cssNumberValue < 0) {
        cssNumberValue = 0
      }
      if (match[2]) {
        if (cssNumberValue > 100) {
          const isZero = cssNumberValue === 0
          cssNumberValue = cssNumberValue % 100
          if (cssNumberValue === 0 && !isZero) {
            cssNumberValue = 100
          }
        }

        cssNumberValue = cssNumberValue / 100
      } else if (cssNumberValue > 1) {
        cssNumberValue = 1
      }

      cssNumberValue = Math.round(cssNumberValue * 10) / 10

      return cssNumberValue
    }

    return 1
  }

  static formatHex(hex) {
    return parseInt(hex, 16)
  }
}

/**
 * https://css-tricks.com/converting-color-spaces-in-javascript/
 */
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
   * @return {boolean}
   */
  isDark() {
    if (isEmpty(this.#color)) {
      return false
    }
    return this.getBrightness() < 128
  }

  /**
   * @return {boolean}
   */
  isWhite() {
    if (isEmpty(this.#color)) {
      return false
    }
    return this.getBrightness() > 240
  }

  /**
   * @return {boolean}
   */
  isLight() {
    if (isEmpty(this.#color)) {
      return false
    }
    return !this.isDark()
  }

  /**
   * @return {?number}
   * @description http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    if (isEmpty(this.#color)) {
      return null
    }
    let rgbStr = this.#colorToRGB(this.#color)
    let rgb = ColorHelper.#extractRGB(rgbStr)
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  }

  /**
   * @return {number}
   * @description http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    let rgb = this.#colorToRGB(this.#color)
    const RsRGB = rgb[0] / 255
    const GsRGB = rgb[1] / 255
    const BsRGB = rgb[2] / 255

    const R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4)
    const G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4)
    const B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4)

    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }

  /**
   * @param {?number} delta
   * @return {string}
   */
  changeLightness(delta) {
    if (isEmpty(this.#color)) {
      return null
    }
    const hslStr = this.#colorToHSL(this.#color)
    if (!isNull(hslStr)) {
      if (hslStr.match(ColorPatterns.hslPattern())) {
        let hsl = ColorHelper.#extractHSL(hslStr)
        hsl[2] = Math.min(100, Math.max(0, hsl[2] + delta))

        return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%,${hsl[3]})`
      }
    }

    return this.#color
  }

  /**
   * @param {string} color
   * @return {string}
   */
  #colorToHSL(color) {
    if (ColorPatterns.rgbPattern().test(color)) {
      return ColorHelper.RGBToHSL(color)
    }
    if (ColorPatterns.hslPattern().test(color)) {
      return color
    }
    if (ColorPatterns.hexPattern().test(color)) {
      return ColorHelper.hexToHSL(color)
    }
    if (ColorPatterns.shortHexPattern().test(color)) {
      return ColorHelper.hexToHSL(color)
    }

    ColorHelper.nameToHSL(color)
  }

  /**
   * @param {string} color
   * @return {string}
   */
  #colorToRGB(color) {
    if (ColorPatterns.rgbPattern().test(color)) {
      return color
    }
    if (ColorPatterns.hslPattern().test(color)) {
      return ColorHelper.HSLToRGB(color)
    }
    if (ColorPatterns.hexPattern().test(color)) {
      return ColorHelper.hexToRGB(color)
    }
    if (ColorPatterns.shortHexPattern().test(color)) {
      return ColorHelper.hexToRGB(color)
    }

    ColorHelper.nameToRGB(color)
  }


  /**
   * @param {string} color
   * @return {number[]}
   */
  static #extractHex(color) {
    let rgb
    if (color.length > 5) {
      rgb = color.match(ColorPatterns.hexPattern())
    } else {
      rgb = color.match(ColorPatterns.shortHexPattern())
    }
    let r = ColorPatterns.formatHex(rgb[1])
    let g = ColorPatterns.formatHex(rgb[2])
    let b = ColorPatterns.formatHex(rgb[3])
    let alpha = ColorPatterns.formatHex(rgb[4] ?? 'FF')

    alpha = alpha / 255
    alpha = Math.round(alpha * 10) / 10

    return [r, g, b, alpha]
  }


  /**
   * @param {string} color
   * @return {number[]}
   */
  static #extractRGB(color) {
    const rgb = color.match(ColorPatterns.rgbPattern())

    let r = ColorPatterns.formatRGBSegment(rgb[1])
    let g = ColorPatterns.formatRGBSegment(rgb[2])
    let b = ColorPatterns.formatRGBSegment(rgb[3])
    let alpha = ColorPatterns.formatAlpha(rgb[4])

    return [r, g, b, alpha]
  }

  /**
   * @param {string} color
   * @return {number[]}
   */
  static #extractHSL(color) {
    const hsl = color.match(ColorPatterns.hslPattern())

    let hue = ColorPatterns.formatHue(hsl[1])
    let saturation = ColorPatterns.formatPercentNumber(hsl[2])
    let lightness = ColorPatterns.formatPercentNumber(hsl[3])
    let alpha = ColorPatterns.formatAlpha(hsl[4])

    return [hue, saturation, lightness, alpha]
  }

  /**
   @param {number} r
   @param {number} g
   @param {number} b
   * @return {number[]}
   */
  static #RGBToHSL(r, g, b) {
    let red = r / 255
    let green = g / 255
    let blue = b / 255

    const min = Math.min(red, green, blue)
    const max = Math.max(red, green, blue)
    const delta = max - min

    let hue
    if (delta === 0) {
      hue = 0
    } else if (max === red) {
      hue = ((green - blue) / delta) % 6
    } else if (max === green) {
      hue = (blue - red) / delta + 2
    } else {
      hue = (red - green) / delta + 4
    }
    hue = Math.round(hue * 60)
    if (hue < 0)
      hue += 360

    let lightness
    lightness = (max + min) / 2

    let saturation
    saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))


    saturation = +(saturation * 100).toFixed(1)
    lightness = +(lightness * 100).toFixed(1)


    return [hue, saturation, lightness]
  }

  static #HSLToRGB(h, s, l) {
    s = s / 100
    l = l / 100
    let c = (1 - Math.abs(2 * l - 1)) * s
    let x = c * (1 - Math.abs((h / 60) % 2 - 1))
    let m = l - c / 2
    let r = 0
    let g = 0
    let b = 0

    if (0 <= h && h < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= h && h < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= h && h < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= h && h < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= h && h < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= h && h < 360) {
      r = c
      g = 0
      b = x
    }
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return [r, g, b]
  }

  /**
   * @param {string} color
   * @return {string}
   */
  static RGBToHex(color) {
    const rgb = this.#extractRGB(color)
    let red = rgb[0].toString(16).padStart(2, '0')
    let green = rgb[1].toString(16).padStart(2, '0')
    let blue = rgb[2].toString(16).padStart(2, '0')
    let alpha = (Math.round((rgb[3] ?? 1) * 255)).toString(16).padStart(2, '0')

    return `#${red}${green}${blue}${alpha}`
  }

  /**
   * @param {string} color
   * @return {string}
   */
  static hexToRGB(color) {
    const hex = this.#extractHex(color)
    let red = hex[0]
    let green = hex[1]
    let blue = hex[2]
    let alpha = hex[3]

    return `rgb(${red},${green},${blue},${alpha})`
  }

  /**
   * @param {string} color
   * @return {string}
   */
  static RGBToHSL(color) {
    const rgb = this.#extractRGB(color)
    const hsl = this.#RGBToHSL(rgb[0], rgb[1], rgb[2])
    return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%,${rgb[3]})`
  }

  /**
   * @param {string} color
   * @return {string}
   */
  static HSLToRGB(color) {
    const hsl = this.#extractHSL(color)
    const rgb = this.#HSLToRGB(
      hsl[0],
      hsl[1],
      hsl[2]
    )

    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]},${hsl[3]})`
  }

  /**
   * @param {string} color
   * @return {string}
   */
  static hexToHSL(color) {
    const hex = this.#extractHex(color)
    const hsl = this.#RGBToHSL(hex[0], hex[1], hex[2])

    return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%,${hex[3]})`
  }

  /**
   * @param {string} name
   * @return {any|string}
   */
  static nameToRGB(name) {
    if (CACHE.has(name)) {
      return CACHE.get(name)
    }
    let fakeDiv = document.createElement('div')
    fakeDiv.style.color = name
    document.body.appendChild(fakeDiv)

    let cs = window.getComputedStyle(fakeDiv)
    let pv = cs.getPropertyValue('color')

    document.body.removeChild(fakeDiv)

    CACHE.set(name, pv)

    return pv
  }

  /**
   * @param {string} name
   * @return {string}
   */
  static nameToHex(name) {
    const rgb = this.nameToRGB(name)
    return this.RGBToHex(rgb)
  }

  /**
   * @param {string} name
   * @return {string}
   */
  static nameToHSL(name) {
    const rgb = this.nameToRGB(name)
    return this.RGBToHSL(rgb)
  }
}