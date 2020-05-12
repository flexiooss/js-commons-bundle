import {assertType} from './__import__assert'
import {globalFlexioImport} from './__import__global-import-registry'
import {isObjectValueValue} from './ObjectValue'

export class TypeCheck {
  /**
   *
   * @param {ObjectValue} inst
   * @throws {TypeError}
   * @return {ObjectValue}
   */
  static assertIsObjectValue(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.ObjectValue,
      'TypeCheck: `inst` should be ObjectValue'
    )
    return inst
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
   * @return {FlexArray}
   */
  static assertIsFlexArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexArray,
      'TypeCheck: `inst` should be FlexArray'
    )
    return inst
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
   * @return {FlexDate}
   */
  static assertIsFlexDate(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDate,
      'TypeCheck: `inst` should be FlexDate'
    )
    return inst
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
   * @return {FlexDateTime}
   */
  static assertIsFlexDateTime(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDateTime,
      'TypeCheck: `inst` should be FlexDateTime'
    )
    return inst
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
   * @return {FlexTime}
   */
  static assertIsFlexTime(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexTime,
      'TypeCheck: `inst` should be FlexTime'
    )
    return inst
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
   * @return {FlexZonedDateTime}
   */
  static assertIsFlexZonedDateTime(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime,
      'TypeCheck: `inst` should be FlexZonedDateTime'
    )
    return inst
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
   * @return {FlexEnum}
   */
  static assertIsFlexEnum(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexEnum,
      'TypeCheck: `inst` should be FlexEnum'
    )
    return inst
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
   * @return {FlexMap}
   */
  static assertIsFlexMap(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.FlexMap,
      'TypeCheck: `inst` should be FlexMap'
    )
    return inst
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
   * @return {StringArray}
   */
  static assertIsStringArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.StringArray,
      'TypeCheck: `inst` should be StringArray'
    )
    return inst
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
   * @return {BooleanArray}
   */
  static assertIsBooleanArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.BooleanArray,
      'TypeCheck: `inst` should be BooleanArray'
    )
    return inst
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
   * @return {DateArray}
   */
  static assertIsDateArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateArray,
      'TypeCheck: `inst` should be DateArray'
    )
    return inst
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
   * @return {DateTimeArray}
   */
  static assertIsDateTimeArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateTimeArray,
      'TypeCheck: `inst` should be DateArray'
    )
    return inst
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
   * @return {DoubleArray}
   */
  static assertIsDoubleArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DoubleArray,
      'TypeCheck: `inst` should be DoubleArray'
    )
    return inst
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
   * @return {TzDateTimeArray}
   */
  static assertIsTzDateTimeArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TzDateTimeArray,
      'TypeCheck: `inst` should be TzDateTimeArray'
    )
    return inst
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
   * @return {TimeArray}
   */
  static assertIsTimeArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TimeArray,
      'TypeCheck: `inst` should be TimeArray'
    )
    return inst
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
   * @return {IntegerArray}
   */
  static assertIsIntegerArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.IntegerArray,
      'TypeCheck: `inst` should be IntegerArray'
    )
    return inst
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
   * @return {ObjectArray}
   */
  static assertIsObjectArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.ObjectArray,
      'TypeCheck: `inst` should be ObjectArray'
    )
    return inst
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
   * @return {FloatArray}
   */
  static assertIsFloatArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.FloatArray,
      'TypeCheck: `inst` should be FloatArray'
    )
    return inst
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
   * @return {LongArray}
   */
  static assertIsLongArray(inst) {
    assertType(
      inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.LongArray,
      'TypeCheck: `inst` should be LongArray'
    )
    return inst
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
