import {assertType, formatType, isNull} from './__import__assert.js'
import {globalFlexioImport} from './__import__global-import-registry.js'
import {isObjectValueValue} from './ObjectValue.js'

export class TypeCheck {
  /**
   * @param {ObjectValue} inst
   * @throws {TypeError}
   * @return {ObjectValue}
   */
  static assertIsObjectValue(inst) {
    assertType(TypeCheck.isObjectValue(inst),
      _=>`should be ObjectValue given: ${formatType(inst)}`)
    return inst
  }

  /**
   * @param {?ObjectValue} inst
   * @throws {TypeError}
   * @return {ObjectValue}
   */
  static assertIsObjectValueOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsObjectValue(inst)
  }

  /**
   * @param {ObjectValue} inst
   * @return {boolean}
   */
  static isObjectValue(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.ObjectValue
  }

  /**
   * @param {FlexArray} inst
   * @throws {TypeError}
   * @return {FlexArray}
   */
  static assertIsFlexArray(inst) {
    assertType(
      TypeCheck.isFlexArray(inst),
      _=>`should be FlexArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FlexArray} inst
   * @throws {TypeError}
   * @return {FlexArray}
   */
  static assertIsFlexArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexArray(inst)
  }

  /**
   * @param {FlexArray} inst
   * @return {boolean}
   */
  static isFlexArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexArray
  }

  /**
   * @param {FlexDate} inst
   * @throws {TypeError}
   * @return {FlexDate}
   */
  static assertIsFlexDate(inst) {
    assertType(
      TypeCheck.isFlexDate(inst),
      _=>`should be FlexDate given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FlexDate} inst
   * @throws {TypeError}
   * @return {FlexDate}
   */
  static assertIsFlexDateOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexDate(inst)
  }

  /**
   * @param {FlexDate} inst
   * @return {boolean}
   */
  static isFlexDate(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDate
  }

  /**
   * @param {FlexDateTime} inst
   * @throws {TypeError}
   * @return {FlexDateTime}
   */
  static assertIsFlexDateTime(inst) {
    assertType(
      TypeCheck.isFlexDateTime(inst),
      _=>`should be FlexDateTime given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FlexDateTime} inst
   * @throws {TypeError}
   * @return {FlexDateTime}
   */
  static assertIsFlexDateTimeOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexDateTime(inst)
  }

  /**
   * @param {FlexDateTime} inst
   * @return {boolean}
   */
  static isFlexDateTime(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexDateTime
  }

  /**
   * @param {FlexTime} inst
   * @throws {TypeError}
   * @return {FlexTime}
   */
  static assertIsFlexTime(inst) {
    assertType(
      TypeCheck.isFlexTime(inst),
      _=>`should be FlexTime given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FlexTime} inst
   * @throws {TypeError}
   * @return {FlexTime}
   */
  static assertIsFlexTimeOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexTime(inst)
  }

  /**
   * @param {FlexTime} inst
   * @return {boolean}
   */
  static isFlexTime(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexTime
  }

  /**
   * @param {FlexZonedDateTime} inst
   * @throws {TypeError}
   * @return {FlexZonedDateTime}
   */
  static assertIsFlexZonedDateTime(inst) {
    assertType(
      TypeCheck.isFlexZonedDateTime(inst),
      _=>`should be FlexZonedDateTime given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {FlexZonedDateTime} inst
   * @throws {TypeError}
   * @return {FlexZonedDateTime}
   */
  static assertIsFlexZonedDateTimeOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexZonedDateTime(inst)
  }

  /**
   * @param {FlexZonedDateTime} inst
   * @return {boolean}
   */
  static isFlexZonedDateTime(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexZonedDateTime
  }

  /**
   * @param {FlexEnum} inst
   * @throws {TypeError}
   * @return {FlexEnum}
   */
  static assertIsFlexEnum(inst) {
    assertType(
      TypeCheck.isFlexEnum(inst),
      _=>`should be FlexEnum given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FlexEnum} inst
   * @throws {TypeError}
   * @return {FlexEnum}
   */
  static assertIsFlexEnumOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexEnum(inst)
  }

  /**
   * @param {FlexEnum} inst
   * @return {boolean}
   */
  static isFlexEnum(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexEnum
  }

  /**
   * @param {FlexMap} inst
   * @throws {TypeError}
   * @return {FlexMap}
   */
  static assertIsFlexMap(inst) {
    assertType(
      TypeCheck.isFlexMap(inst),
      _=>`should be FlexMap given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FlexMap} inst
   * @throws {TypeError}
   * @return {FlexMap}
   */
  static assertIsFlexMapOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFlexMap(inst)
  }

  /**
   * @param {FlexMap} inst
   * @return {boolean}
   */
  static isFlexMap(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.FlexMap
  }

  /**
   * @param {StringArray} inst
   * @throws {TypeError}
   * @return {StringArray}
   */
  static assertIsStringArray(inst) {
    assertType(
      TypeCheck.isStringArray(inst),
      _=>`should be StringArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?StringArray} inst
   * @throws {TypeError}
   * @return {StringArray}
   */
  static assertIsStringArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsStringArray(inst)
  }

  /**
   * @param {StringArray} inst
   * @return {boolean}
   */
  static isStringArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.StringArray
  }

  /**
   * @param {BooleanArray} inst
   * @throws {TypeError}
   * @return {BooleanArray}
   */
  static assertIsBooleanArray(inst) {
    assertType(
      TypeCheck.isBooleanArray(inst),
      _=>`should be BooleanArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?BooleanArray} inst
   * @throws {TypeError}
   * @return {BooleanArray}
   */
  static assertIsBooleanArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsBooleanArray(inst)
  }

  /**
   * @param {BooleanArray} inst
   * @return {boolean}
   */
  static isBooleanArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.BooleanArray
  }

  /**
   * @param {DateArray} inst
   * @throws {TypeError}
   * @return {DateArray}
   */
  static assertIsDateArray(inst) {
    assertType(
      TypeCheck.isDateArray(inst),
      _=>`should be DateArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?DateArray} inst
   * @throws {TypeError}
   * @return {DateArray}
   */
  static assertIsDateArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsDateArray(inst)
  }

  /**
   * @param {DateArray} inst
   * @return {boolean}
   */
  static isDateArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateArray
  }

  /**
   * @param {DateTimeArray} inst
   * @throws {TypeError}
   * @return {DateTimeArray}
   */
  static assertIsDateTimeArray(inst) {
    assertType(
      TypeCheck.isDateTimeArray(inst),
      _=>`should be DateArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?DateTimeArray} inst
   * @throws {TypeError}
   * @return {DateTimeArray}
   */
  static assertIsDateTimeArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsDateTimeArray(inst)
  }

  /**
   * @param {DateTimeArray} inst
   * @return {boolean}
   */
  static isDateTimeArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DateTimeArray
  }

  /**
   * @param {DoubleArray} inst
   * @throws {TypeError}
   * @return {DoubleArray}
   */
  static assertIsDoubleArray(inst) {
    assertType(
      TypeCheck.isDoubleArray(inst),
      _=>`should be DoubleArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?DoubleArray} inst
   * @throws {TypeError}
   * @return {DoubleArray}
   */
  static assertIsDoubleArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsDoubleArray(inst)
  }

  /**
   * @param {DoubleArray} inst
   * @return {boolean}
   */
  static isDoubleArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.DoubleArray
  }

  /**
   * @param {TzDateTimeArray} inst
   * @throws {TypeError}
   * @return {TzDateTimeArray}
   */
  static assertIsTzDateTimeArray(inst) {
    assertType(
      TypeCheck.isTzDateTimeArray(inst),
      _=>`should be TzDateTimeArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?TzDateTimeArray} inst
   * @throws {TypeError}
   * @return {TzDateTimeArray}
   */
  static assertIsTzDateTimeArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsTzDateTimeArray(inst)
  }

  /**
   * @param {TzDateTimeArray} inst
   * @return {boolean}
   */
  static isTzDateTimeArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TzDateTimeArray
  }

  /**
   * @param {TimeArray} inst
   * @throws {TypeError}
   * @return {TimeArray}
   */
  static assertIsTimeArray(inst) {
    assertType(
      TypeCheck.isTimeArray(inst),
      _=>`should be TimeArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?TimeArray} inst
   * @throws {TypeError}
   * @return {TimeArray}
   */
  static assertIsTimeArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsTimeArray(inst)
  }

  /**
   * @param {TimeArray} inst
   * @return {boolean}
   */
  static isTimeArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.TimeArray
  }

  /**
   * @param {IntegerArray} inst
   * @throws {TypeError}
   * @return {IntegerArray}
   */
  static assertIsIntegerArray(inst) {
    assertType(
      TypeCheck.isIntegerArray(inst),
      _=>`should be IntegerArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {IntegerArray} inst
   * @throws {TypeError}
   * @return {IntegerArray}
   */
  static assertIsIntegerArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsIntegerArray(inst)
  }

  /**
   * @param {IntegerArray} inst
   * @return {boolean}
   */
  static isIntegerArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.IntegerArray
  }

  /**
   * @param {ObjectArray} inst
   * @throws {TypeError}
   * @return {ObjectArray}
   */
  static assertIsObjectArray(inst) {
    assertType(
      TypeCheck.isObjectArray(inst),
      _=>`should be ObjectArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?ObjectArray} inst
   * @throws {TypeError}
   * @return {ObjectArray}
   */
  static assertIsObjectArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsObjectArray(inst)
  }

  /**
   * @param {ObjectArray} inst
   * @return {boolean}
   */
  static isObjectArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.ObjectArray
  }

  /**
   * @param {FloatArray} inst
   * @throws {TypeError}
   * @return {FloatArray}
   */
  static assertIsFloatArray(inst) {
    assertType(
      TypeCheck.isFloatArray(inst),
      _=>`should be FloatArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?FloatArray} inst
   * @throws {TypeError}
   * @return {FloatArray}
   */
  static assertIsFloatArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsFloatArray(inst)
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
   * @param {LongArray} inst
   * @throws {TypeError}
   * @return {LongArray}
   */
  static assertIsLongArray(inst) {
    assertType(
      TypeCheck.isLongArray(inst),
      _=>`should be LongArray given: ${formatType(inst)}`
    )
    return inst
  }

  /**
   * @param {?LongArray} inst
   * @throws {TypeError}
   * @return {LongArray}
   */
  static assertIsLongArrayOrNull(inst) {
    return (isNull(inst)) ? inst : TypeCheck.assertIsLongArray(inst)
  }

  /**
   * @param {LongArray} inst
   * @return {boolean}
   */
  static isLongArray(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.arrays.LongArray
  }

  /**
   * @param {IndexError} inst
   * @return {boolean}
   */
  static isIndexError(inst) {
    return inst instanceof globalFlexioImport.io.flexio.flex_types.IndexError
  }

  /**
   * @param inst
   * @return {boolean}
   */
  static isObjectValueValue(inst) {
    return isObjectValueValue(inst)
  }

  /**
   * @param {ObjectValueValue} inst
   * @throws {TypeError}
   * @return {ObjectValueValue}
   */
  static assertIsObjectValueValue(inst) {
    assertType(TypeCheck.isObjectValueValue(inst),
      _=>`should be \`ObjectValueValue\` given: ${formatType(inst)}`)
    return inst
  }

}
