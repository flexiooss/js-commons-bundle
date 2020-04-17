/**
 *
 * @param {number} length
 * @return {string}
 */
export const RandomString = (length) => {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1)
}
