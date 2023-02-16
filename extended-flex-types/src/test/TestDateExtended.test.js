/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {DateExtended} from '../js/DateExtended.js'
import {FlexDate, FlexDateTime, FlexTime} from '../js/__import__flex-types.js'

const assert = require('assert')

export class TestDateExtendedTest extends TestCase {
  debug = true

  testToUTCFlexDateTimeZoned() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.UTCToFlexZonedDateTime()
    assert.deepEqual(DateExtended.fromFlexZonedDateTime(flexDate), date)
  }

  testToFlexDateTime() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toLocaleFlexDateTime()
    assert.deepEqual(DateExtended.fromFlexDateTime(flexDate), date)
  }

  testToUTCFlexDateTime() {
    let date = new DateExtended(2019, 6, 19, 9, 59, 3, 34)
    let flexDate = date.toUTCFlexDateTime()
    assert.deepEqual(DateExtended.fromUTCFlexDateTime(flexDate), date)
  }

  testToFlexDate() {
    let date = new DateExtended(2019, 6, 19, 1, 0, 0)
    let flexDate = date.toLocaleFlexDate()
    let dateFromFlex = DateExtended.fromFlexDate(flexDate)
    assert.deepEqual(dateFromFlex.getFullYear(), date.getFullYear())
    assert.deepEqual(dateFromFlex.getMonth(), date.getMonth())
    assert.deepEqual(dateFromFlex.getDate(), date.getDate())
  }

  testToUTCFlexDate() {
    let date = new DateExtended(2019, 6, 19, 1, 0, 0)
    let flexDateUTC = date.toUTCFlexDate()
    let dateFromFlex = DateExtended.fromFlexDate(flexDateUTC)
    assert.deepEqual(dateFromFlex.getFullYear(), date.getUTCFullYear())
    assert.deepEqual(dateFromFlex.getMonth(), date.getUTCMonth())
    assert.deepEqual(dateFromFlex.getDate(), date.getUTCDate())
  }

  testToFlexTime() {
    let date = new DateExtended(0, 0, 0, 1, 50, 3, 34)
    let flexDate = date.toLocaleFlexTime()
    let dateFromFlex = DateExtended.fromFlexTime(flexDate)
    assert.deepEqual(dateFromFlex.getHours(), date.getHours())
    assert.deepEqual(dateFromFlex.getMinutes(), date.getMinutes())
    assert.deepEqual(dateFromFlex.getSeconds(), date.getSeconds())
    assert.deepEqual(dateFromFlex.getMilliseconds(), date.getMilliseconds())
  }

  testToUTCFlexTime() {
    let date = new DateExtended(0, 0, 0, 1, 50, 3, 34)
    let flexDate = date.toUTCFlexTime()
    let dateFromFlex = DateExtended.fromFlexTime(flexDate)
    assert.deepEqual(dateFromFlex.getHours(), date.getUTCHours())
    assert.deepEqual(dateFromFlex.getMinutes(), date.getUTCMinutes())
    assert.deepEqual(dateFromFlex.getSeconds(), date.getUTCSeconds())
    assert.deepEqual(dateFromFlex.getMilliseconds(), date.getUTCMilliseconds())
  }

  testStringToFlexDate() {
    let str = '2009-06-24'
    let flexDate = DateExtended.fromStringToFlexDate(str)
    assert.deepEqual(flexDate, new FlexDate('2009-06-24'))

    str = '2009-06-31'
    flexDate = DateExtended.fromStringToFlexDate(str)
    assert.deepEqual(flexDate, new FlexDate('2009-07-01'))

    str = '2009-13-24'
    flexDate = DateExtended.fromStringToFlexDate(str)
    assert.deepEqual(flexDate, new FlexDate('2010-01-24'))

    str = '2009-13-244'
    flexDate = DateExtended.fromStringToFlexDate(str)
    assert.deepEqual(flexDate, null)
  }

  testStringToFlexDateTime() {
    let str = '2009-06-24T00:00:00.0001545'
    let flexDate = DateExtended.fromStringToFlexDateTime(str)
    assert.deepEqual(flexDate, new FlexDateTime('2009-06-24T00:00:00.000'))

    str = '2009-06-24T24:00:00.000'
    flexDate = DateExtended.fromStringToFlexDateTime(str)
    assert.deepEqual(flexDate, new FlexDateTime('2009-06-25T00:00:00.000'))

    str = '2009-06-24T00:00:000.000'
    flexDate = DateExtended.fromStringToFlexDateTime(str)
    assert.deepEqual(flexDate, null)
  }

  testStringToFlexTime() {
    let str = '00:00:00.000'
    let flexTime = DateExtended.fromStringToFlexTime(str)
    assert.deepEqual(flexTime, new FlexTime('00:00:00.000'))

    str = '24:00:00.000'
    flexTime = DateExtended.fromStringToFlexTime(str)
    assert.deepEqual(flexTime, new FlexTime('00:00:00.000'))

    str = '00:60:00.000'
    flexTime = DateExtended.fromStringToFlexTime(str)
    assert.deepEqual(flexTime, new FlexTime('01:00:00.000'))

    str = '00:00:60.000'
    flexTime = DateExtended.fromStringToFlexTime(str)
    assert.deepEqual(flexTime, new FlexTime('00:01:00.000'))

    str = '00:000:00.000'
    flexTime = DateExtended.fromStringToFlexTime(str)
    assert.deepEqual(flexTime, null)
  }

  testDateWithZ() {
    let date = new DateExtended('2021-02-15T15:21:07Z')
    assert.deepEqual(date.toISOString(), '2021-02-15T15:21:07.000Z')

    date = new DateExtended(date.toISOString())
    assert.deepEqual(date.toISOString(), '2021-02-15T15:21:07.000Z')

    date = new DateExtended('2021-02-15T15:21:07') // applique le offset local, il va donc retrancher 1H
    assert.deepEqual(date.toISOString(), '2021-02-15T15:21:07')
  }
}
// runTest(TestDateExtendedTest)
