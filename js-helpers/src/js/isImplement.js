import {isNull, isUndefined} from './__import__assert.js'


/**
 *
 * @param inst
 * @param constructorString
 * @return {boolean}
 */
export const isImplement = (inst, constructorString) => {
  let proto = inst
  if (!isNull(proto) && !isUndefined(proto)) {
    try {

      do {
        if (proto.constructor.toString() === constructorString) {
          return true
        }
        proto = Object.getPrototypeOf(proto)

      } while (!isNull(proto))
    } catch (e) {
      console.error(e)
    }
  }
  return false
}
