export class FileHelper {
  /**
   * @param {File} file
   * @param {string[]} accept
   * @return {boolean}
   */
  static isValidFile(file, accept) {
    let mimeType = file.type
    let fileName = file.name
    let baseMimeType = mimeType.replace(/\/.*$/, '')

    for (let validType of accept) {
      validType = validType.trim()
      if (fileName.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
        return true
      } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, '') || validType === '*/*') {
          return true
        }
      } else {
        if (mimeType === validType) {
          return true
        }
      }
    }
    return false
  }

  /**
   * @param {string} size
   * @return {string}
   */
  static sizeToString(size) {
    let sizeNumber = Math.abs(parseInt(size, 10))
    if (!sizeNumber) {
      return '0 ko'
    }
    sizeNumber = sizeNumber / 1024
    const computerUnits = ['ko', 'Mo', 'Go', 'To']
    for (let unit of computerUnits) {
      if (sizeNumber > 1024) {
        sizeNumber = sizeNumber / 1024
      } else {
        return this.#formatSize(sizeNumber, unit)
      }
    }

    return this.#formatSize(sizeNumber, 'To')
  }

  static #formatSize(sizeNumber, unit) {
    return `${sizeNumber.toFixed(1).toString()} ${unit}`
  }
}