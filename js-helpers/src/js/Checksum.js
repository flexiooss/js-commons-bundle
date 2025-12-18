export class Checksum {

  /**
   *
   * @param {string} data
   * @return {number}
   */
  static number32bit(data) {
    let hash = 0, strlen = data.length, i, char
    if (strlen === 0) {
      return hash
    }
    for (i = 0; i < strlen; i++) {
      char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return hash
  }

  /**
   * @param {string} data
   * @return {string}
   */
  static simpleHash(data) {
    return Math.abs(Checksum.number32bit(data)).toString(16);
  }

  /**
   * @param {string} data
   * @param {string} [algorithm= 'SHA-256'] - 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'
   * @return {Promise<string>}
   */
  static async hash(data, algorithm = 'SHA-256') {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * @param {File} file
   * @param {string} [algorithm= 'SHA-256'] - 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'
   * @return {Promise<string>}
   */
  static async hashFile(file, algorithm = 'SHA-256') {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
