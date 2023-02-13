import {
  assertType,
  isObject,
  isUndefined,
  isArray, isNull, isNumber, isString,isStrictObject
} from './__import__assert.js'

/**
 *
 * @param {Object} object
 * @param {function} callback
 * @return {Object}
 * @function
 * @export
 */
export const sortObject = (object, callback) => {
  var arrayTemp = []
  var objectTemp = []
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      arrayTemp.push({
        'key': prop,
        'value': object[prop]
      })
    }
  }
  arrayTemp.sort((a, b) => {
    return callback(a, b)
  })
  let countOfArray = arrayTemp.length
  for (let i = 0; i < countOfArray; i++) {
    objectTemp[arrayTemp[i]['key']] = arrayTemp[i]['value']
  }
  return objectTemp
}
/**
 *
 * @param {Object} object
 * @param {filterObjectCallback} callback
 * @return {Object}
 * @function
 * @export
 */
export const filterObject = (object, callback) => {
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (!callback(value, key, object)) {
      delete object[key]
    }
  })
  return object
}
/**
 * @callback filterObjectCallback
 * @param {*} value
 * @param {string} key
 * @param {Object} object
 * @return {boolean}
 */

export const intersectObjectByKey = (object) => {
  return Object.keys(object)
    .filter(key => this.storesName.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})
}

/**
 *
 * @param {Object} object
 * @param {Array<String>} properties
 * @returns {boolean}
 * @function
 * @export
 */
export const hasProperties = (object, properties) => {
  for (const prop of properties) {
    if (!object.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export const cloneObject = (object, parseDate = false) => cloneWithJsonMethod(object, parseDate)

export const cloneWithJsonMethod = (object, parseDate = false) => {
  if (parseDate) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
    return JSON.parse(JSON.stringify(object), (key, value) => {
      if (dateFormat.test(value)) {
        return new Date(value)
      }

      return value
    })
  } else {
    return JSON.parse(JSON.stringify(object))
  }
}

/**
 *
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object}
 * @function
 * @export
 */
export const mergeWithoutPrototype = (target, ...sources) => {
  return Object.assign(target, ...sources)
}

/**
 *
 * @param {object} target
 * @param {object} source
 * @return {object} target
 * @function
 * @export
 */
export const deepMerge = (target, source) => {
  for (let k in source) {
    const sourceValue = source[k]
    const targetValue = target[k]

    if (isStrictObject(sourceValue)) {
      target[k] = (!isUndefined(targetValue)) ? deepMerge(isObject(targetValue) ? targetValue : {}, cloneWithJsonMethod(sourceValue)) : cloneWithJsonMethod(sourceValue)
    } else if (isArray(sourceValue)) {
      target[k] = (isArray(targetValue)) ? [...new Set(targetValue.concat(cloneWithJsonMethod(sourceValue)))] : cloneWithJsonMethod(sourceValue)
    } else {
      target[k] = sourceValue
    }
  }

  return target
}

/**

 * @param {Object} object
 * @param {Array.<string>} path
 * @param {*} [defaultValue=null]
 * @returns {*}
 */
export const deepKeyResolverByPath = (object, path, defaultValue = null) => {
  if (isNull(object)) {
    return defaultValue
  }

  assertType(
    isObject(object),
    'deepKeyResolverByPath: `object` should be an Object'
  )
  assertType(
    isArray(path),
    'deepKeyResolverByPath: `path` should be an Array'
  )
  let ret = object

  do {
    let key = path.shift()
    assertType(
      isString(key) || isNumber(key),
      'deepKeyResolverByPath: `key` should be a string or number'
    )
    if (ret[key] !== undefined && key in ret) {
      ret = ret[key]
    } else {
      return defaultValue
    }
  } while (path.length)
  return ret
}

/**
 *
 * @param {?Object} object
 * @param {Array.<string>} path
 * @param {*} value
 * @param {?Object} [objectAll=null]
 * @return {?Object}
 */
export const deepKeyAssignerByPath = (object, path, value, objectAll = null) => {

  if (isNull(object)) {
    return null
  }

  if (isNull(objectAll)) {
    objectAll = object
  }

  assertType(
    isObject(object),
    'valueFor: `object` should be an Object'
  )
  assertType(
    isArray(path),
    'valueFor: `path` should be an Array'
  )

  assertType(
    isNull(objectAll) || isObject(objectAll),
    'valueFor: `objectAll` should be an Object or Null'
  )

  if (path.length === 0) {
    return objectAll

  }

  let key = path.shift()
  assertType(
    isString(key) || isNumber(key),
    'deepKeyAssignerByPath: `key` should be a string or number'
  )
  if (path.length === 0) {

    object[key] = value
    return objectAll

  } else {
    if (!isObject(object[key])) {
      object[key] = {}
    }

    return deepKeyAssignerByPath(object[key], path, value, objectAll)
  }
}
