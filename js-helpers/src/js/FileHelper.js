import {isNull} from '../../../assert/index.js'

export class FileHelper {
  static #MIME_TYPE_BASE_RE = /\/.*$/;
  static #MIME_TYPE_SPE_BASE_RE =/^[\w\d_-]\//;
  static #MIME_TYPE_SPE_ALL_RE =/\/\*$/;
  /**
   * @param {File} file
   * @param {?string[]} accept
   * @param {?string[]} forbidden
   * @return {boolean}
   */
  static isValidFile(file, accept = null, forbidden = null) {
    return this.validateFileFrom(file.name, file.type, accept, forbidden);
  }

  /**
   * @param {string} fileName
   * @param {string} fileMimeType
   * @param {?string[]} accept
   * @param {?string[]} forbidden
   * @return {boolean}
   */
  static validateFileFrom(fileName, fileMimeType, accept = null, forbidden = null) {
    if (isNull(accept) && isNull(forbidden)) return true;


    if (!isNull(accept)) {

      for (let type of accept) {
        if (this.validateFileFromRule(fileName, fileMimeType, type)) return true;
      }

      return false;
    } else {
      for (let type of forbidden) {
        if (this.validateFileFromRule(fileName, fileMimeType, type)) return false;
      }
      return true;
    }

  }

  /**
   * @param  {string} fileName
   * @param  {string} fileMimeType
   * @param {string} mimeTypeOrExtension
   * @return {boolean}
   */
  static validateFileFromRule(fileName, fileMimeType, mimeTypeOrExtension) {
    fileMimeType = fileMimeType.toLowerCase();
    mimeTypeOrExtension = mimeTypeOrExtension.toLowerCase();

    if (mimeTypeOrExtension === '*/*') return true;
    if (fileMimeType === mimeTypeOrExtension) return true;
    if (fileMimeType.replace(this.#MIME_TYPE_SPE_BASE_RE, '') === mimeTypeOrExtension) return true;

    if (this.#MIME_TYPE_SPE_ALL_RE.test(mimeTypeOrExtension)) {
      const baseFileMimeType = fileMimeType.replace(this.#MIME_TYPE_BASE_RE, '');
      const baseMimeTypeOrExtension = mimeTypeOrExtension.replace(this.#MIME_TYPE_BASE_RE, '');
      if (baseFileMimeType === baseMimeTypeOrExtension) return true;
    }

    if (fileName.toLowerCase().indexOf(mimeTypeOrExtension.toLowerCase(), fileName.length - mimeTypeOrExtension.length) !== -1) return true;

    return false;
  }

  /**
   * @param {string} size
   * @return {string}
   */
  static sizeToString(size) {
    if (isNull(size)) return ''
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