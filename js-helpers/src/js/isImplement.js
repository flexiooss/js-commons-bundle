import {isNull} from './__import__assert'


/**
 *
 * @param inst
 * @param constructorString
 * @return {boolean}
 */
export const isImplement = (inst, constructorString) => {
  let proto = inst
  if (!isNull(proto)) {

    do {
      if (proto.constructor.toString() === constructorString) {
        return true
      }
      proto = Object.getPrototypeOf(proto)

    } while (!isNull(proto))
  }
  return false
}
