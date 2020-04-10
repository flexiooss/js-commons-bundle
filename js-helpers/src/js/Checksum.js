export class Checksum {

  /**
   *
   * @param {string} text
   * @return {number}
   */
  static number32bit(text) {
    let hash = 0, strlen = text.length, i, c
    if (strlen === 0) {
      return hash
    }
    for (i = 0; i < strlen; i++) {
      c = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + c
      hash = hash & hash
    }
    return hash
  }
}
