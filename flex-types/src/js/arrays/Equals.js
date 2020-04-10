import {isNull} from '../__import__assert'


/**
 *
 * @param {?FlexArray} to
 * @param {function(to:FlexArray)} typeCheck
 * @return {boolean}
 */
export const equalsPrimitive = (from, to, typeCheck) => {
  if (isNull(to)) {
    return false
  }

  typeCheck(to)

  if (to.length !== from.length) {
    return false
  }

  if (to == from) {
    return true
  }

  for (let i = 0; i < from.length; ++i) {
    if (from.get(i) !== to.get(i)) {
      return false
    }
  }
  return true
}

/**
 *
 * @param {?FlexArray} to
 * @param {function(to:FlexArray)} typeCheck
 * @return {boolean}
 */
export const equalsObject = (from, to, typeCheck) => {
  if (isNull(to)) {
    return false
  }

  typeCheck(to)

  if (to.length !== from.length) {
    return false
  }

  if (to == from) {
    return true
  }

  for (let i = 0; i < from.length; ++i) {
    if (!from.get(i).equals(to.get(i))) {
      return false
    }
  }
  return true
}

