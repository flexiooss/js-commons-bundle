/**
 * @param {string} [prefix='']
 * @return {string}
 * @function
 */
export const UID = (prefix = '') => {
  if('crypto' in globalThis) {
    return prefix + globalThis.crypto.randomUUID();
  }
  let dt = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return prefix + uuid
}

/**
 * @param {string} [prefix='']
 * @return {string}
 * @function
 */
export const UIDMini = (prefix = '') => {
  return prefix + Math.abs(((Math.random() * new Date()) | 0))
}
