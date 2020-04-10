import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isObjectValueValue} from './ObjectValue'

export class TypeCheck {
  /**
   *
   * @param {ObjectValue} inst
   * @throws {TypeError}
   */
  static assertIsObjectValue(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.ObjectValue,
      'TypeCheck: `inst` should be ObjectValue'
    )
  }

  /**
   *
   * @param {ObjectValue} inst
   * @return {boolean}
   */
  static isObjectValue(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.ObjectValue
  }

  /**
   *
   * @param {FlexArray} inst
   * @throws {TypeError}
   */
  static assertIsFlexArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexArray,
      'TypeCheck: `inst` should be FlexArray'
    )
  }

  /**
   *
   * @param {FlexArray} inst
   * @return {boolean}
   */
  static isFlexArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexArray
  }

  /**
   *
   * @param {FlexDate} inst
   * @throws {TypeError}
   */
  static assertIsFlexDate(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDate,
      'TypeCheck: `inst` should be FlexDate'
    )
  }

  /**
   *
   * @param {FlexDate} inst
   * @return {boolean}
   */
  static isFlexDate(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDate
  }

  /**
   *
   * @param {FlexDateTime} inst
   * @throws {TypeError}
   */
  static assertIsFlexDateTime(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDateTime,
      'TypeCheck: `inst` should be FlexDateTime'
    )
  }

  /**
   *
   * @param {FlexDateTime} inst
   * @return {boolean}
   */
  static isFlexDateTime(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDateTime
  }

  /**
   *
   * @param {FlexTime} inst
   * @throws {TypeError}
   */
  static assertIsFlexTime(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexTime,
      'TypeCheck: `inst` should be FlexTime'
    )
  }

  /**
   *
   * @param {FlexTime} inst
   * @return {boolean}
   */
  static isFlexTime(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexTime
  }

  /**
   *
   * @param {FlexZonedDateTime} inst
   * @throws {TypeError}
   */
  static assertIsFlexZonedDateTime(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime,
      'TypeCheck: `inst` should be FlexZonedDateTime'
    )
  }

  /**
   *
   * @param {FlexZonedDateTime} inst
   * @return {boolean}
   */
  static isFlexZonedDateTime(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime
  }

  /**
   *
   * @param {FlexEnum} inst
   * @throws {TypeError}
   */
  static assertIsFlexEnum(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexEnum,
      'TypeCheck: `inst` should be FlexEnum'
    )
  }

  /**
   *
   * @param {FlexEnum} inst
   * @return {boolean}
   */
  static isFlexEnum(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexEnum
  }

  /**
   *
   * @param {FlexMap} inst
   * @throws {TypeError}
   */
  static assertIsFlexMap(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexMap,
      'TypeCheck: `inst` should be FlexMap'
    )
  }

  /**
   *
   * @param {FlexMap} inst
   * @return {boolean}
   */
  static isFlexMap(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexMap
  }

  /**
   *
   * @param {StringArray} inst
   * @throws {TypeError}
   */
  static assertIsStringArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.StringArray,
      'TypeCheck: `inst` should be StringArray'
    )
  }

  /**
   *
   * @param {StringArray} inst
   * @return {boolean}
   */
  static isStringArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.StringArray
  }

  /**
   *
   * @param {BooleanArray} inst
   * @throws {TypeError}
   */
  static assertIsBooleanArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.BooleanArray,
      'TypeCheck: `inst` should be BooleanArray'
    )
  }

  /**
   *
   * @param {BooleanArray} inst
   * @return {boolean}
   */
  static isBooleanArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.BooleanArray
  }

  /**
   *
   * @param {DateArray} inst
   * @throws {TypeError}
   */
  static assertIsDateArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateArray,
      'TypeCheck: `inst` should be DateArray'
    )
  }

  /**
   *
   * @param {DateArray} inst
   * @return {boolean}
   */
  static isDateArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateArray
  }

  /**
   *
   * @param {DateTimeArray} inst
   * @throws {TypeError}
   */
  static assertIsDateTimeArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateTimeArray,
      'TypeCheck: `inst` should be DateArray'
    )
  }

  /**
   *
   * @param {DateTimeArray} inst
   * @return {boolean}
   */
  static isDateTimeArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateTimeArray
  }

  /**
   *
   * @param {DoubleArray} inst
   * @throws {TypeError}
   */
  static assertIsDoubleArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DoubleArray,
      'TypeCheck: `inst` should be DoubleArray'
    )
  }

  /**
   *
   * @param {DoubleArray} inst
   * @return {boolean}
   */
  static isDoubleArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DoubleArray
  }

  /**
   *
   * @param {TzDateTimeArray} inst
   * @throws {TypeError}
   */
  static assertIsTzDateTimeArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TzDateTimeArray,
      'TypeCheck: `inst` should be TzDateTimeArray'
    )
  }

  /**
   *
   * @param {TzDateTimeArray} inst
   * @return {boolean}
   */
  static isTzDateTimeArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TzDateTimeArray
  }

  /**
   *
   * @param {TimeArray} inst
   * @throws {TypeError}
   */
  static assertIsTimeArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TimeArray,
      'TypeCheck: `inst` should be TimeArray'
    )
  }

  /**
   *
   * @param {TimeArray} inst
   * @return {boolean}
   */
  static isTimeArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TimeArray
  }

  /**
   *
   * @param {IntegerArray} inst
   * @throws {TypeError}
   */
  static assertIsIntegerArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.IntegerArray,
      'TypeCheck: `inst` should be IntegerArray'
    )
  }

  /**
   *
   * @param {IntegerArray} inst
   * @return {boolean}
   */
  static isIntegerArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.IntegerArray
  }

  /**
   *
   * @param {ObjectArray} inst
   * @throws {TypeError}
   */
  static assertIsObjectArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.ObjectArray,
      'TypeCheck: `inst` should be ObjectArray'
    )
  }

  /**
   *
   * @param {ObjectArray} inst
   * @return {boolean}
   */
  static isObjectArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.ObjectArray
  }

  /**
   *
   * @param {FloatArray} inst
   * @throws {TypeError}
   */
  static assertIsFloatArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.FloatArray,
      'TypeCheck: `inst` should be FloatArray'
    )
  }

  /**
   *
   * @param {FloatArray} inst
   * @return {boolean}
   */
  static isFloatArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.FloatArray
  }

  /**
   *
   * @param {LongArray} inst
   * @throws {TypeError}
   */
  static assertIsLongArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.LongArray,
      'TypeCheck: `inst` should be LongArray'
    )
  }

  /**
   *
   * @param {LongArray} inst
   * @return {boolean}
   */
  static isLongArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.LongArray
  }

  /**
   *
   * @param {IndexError} inst
   * @return {boolean}
   */
  static isIndexError(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.IndexError
  }

  /**
   *
   * @param inst
   * @return {boolean}
   */
  static isObjectValueValue(inst) {
    return isObjectValueValue(inst)
  }

}
