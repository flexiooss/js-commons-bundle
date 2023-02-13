import {isNull} from './__import__assert.js'

/**
 *
 * @param {*} a
 * @return {boolean}
 * @function
 * @export
 */

export const isPayloadNull = a => a === '' || isNull(a)