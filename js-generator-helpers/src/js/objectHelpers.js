/**
 *
 * @param {Object} object
 * @return {Object}
 */
import {isObject, isArray} from './__import__assert'


/**
 *
 * @param {*} from
 * @readonly
 * @return {Object}
 * @function
 * @export
 */
export const deepFreezeSeal = (from) => {

    if ((from instanceof Map || from instanceof Set) && !Object.isSealed(from) && !Object.isFrozen(from)) {


      from.forEach((v) => {
        deepFreezeSeal(v)
      })

      from.set = function(key) {
        throw new Error('Can\'t add property ' + key + ', map/set is not extensible')
      }

      from.add = function(key) {
        throw new Error('Can\'t add property ' + key + ', map/set is not extensible')
      }

      from.delete = function(key) {
        throw new Error('Can\'t delete property ' + key + ', map/set is frozen')
      }

      from.clear = function() {
        throw new Error('Can\'t clear map, map/set is frozen')
      }
    } else {

      if (isObject(from)) {
        for (const name of Object.getOwnPropertyNames(from)) {
          let prop = from[name]
          if ((isObject(prop) || isArray(prop)) && !Object.isSealed(prop) && !Object.isFrozen(prop) && Object.getOwnPropertyDescriptor(from, name).writable) {
            deepFreezeSeal(prop)
          }
        }

      } else if (isArray(from)) {
        for (const i of from) {
          if ((isObject(i) || isArray(i)) && !Object.isSealed(i) && !Object.isFrozen(i) ) {
            deepFreezeSeal(i)
          }
        }
      }

    }

  return Object.freeze(Object.seal(from))
}

/**
 * split a keys and deep check if key exists in an Object
 * @param {*} object
 * @param {string} keys
 * @param {string} separator
 * @returns {Error|*}
 */
export const deepKeyResolver = (object, keys, separator = '.') => {
  let arrayKeys = keys.split(separator)
  let ret = object
  do {
    let key = arrayKeys.shift()
    if (ret[key] !== undefined && key in ret) {
      ret = ret[key]
    } else {
      throw new Error('No __chunckValue for this path !')
    }
  } while (arrayKeys.length)
  return ret
}

/**
 *
 * @param {Object} object
 * @param {string} path
 * @param {*} value
 * @param {string} separator
 */
export const deepKeyAssigner = (object, path, value, separator = '.') => {
  let pathParts = path.split(separator)
  let last = path.length

  if (pathParts.length === 1) {
    object[path] = value
  } else {
    if (!object[pathParts[0]]) {
      object[pathParts[0]] = {}
    }
    let start = pathParts[0].length + 1
    let subPath = path.substring(start, last)
    deepKeyAssigner(object[pathParts[0]], subPath, value, separator)
  }
}
