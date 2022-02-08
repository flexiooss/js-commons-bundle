/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {DateExtended} from '../js/DateExtended'
import {FlexDate, FlexDateTime, FlexTime} from '../js/__import__flex-types'

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

    date = new DateExtended('2021-02-15T15:21:07')
    assert.deepEqual(date.toISOString(), '2021-02-15T15:21:07')
  }

  testFormat() {
    const date = new DateExtended('2021-02-15T15:21:07Z')
    let formatted = date.format('dd/MM/yyyy HH:mm:ss')
    assert.deepEqual(formatted, '15/02/2021 15:21:07')

    formatted = date.format('dd mm')
    assert.deepEqual(formatted, '15 21')
  }

  testFormatWithTimeZoneWinter() {
    const winter = new DateExtended('2021-02-15T15:21:07Z')
    this.log('winter : ' + winter.toISOString())

    const formatted = winter.format('dd/MM/yyyy HH:mm:ss', 'fr', 'Australia/Sydney')
    this.log('format winter : ' + formatted)
    assert.deepEqual(formatted, '16/02/2021 02:21:07')

    const parsed = DateExtended.fromISOWithTimezone('2021-02-16T02:21:07', 'Australia/Sydney')
    this.log('parsed : ' + parsed.toISOString())
    assert.deepEqual(parsed.toISOString(), '2021-02-15T15:21:07.000Z')
  }

  testFormatWithTimeZoneSummer() {
    const summer = new DateExtended('2021-08-15T15:21:07Z')
    this.log('summer : ' + summer.toISOString())

    const formatted = summer.format('dd/MM/yyyy HH:mm:ss', 'fr', 'Australia/Sydney')
    this.log('format summer : ' + formatted)
    assert.deepEqual(formatted, '16/08/2021 01:21:07', 'format')

    const parsed = DateExtended.fromISOWithTimezone('2021-08-16T01:21:07', 'Australia/Sydney')
    this.log('parsed : ' + parsed.toISOString())
    assert.deepEqual(parsed.toISOString(), '2021-08-15T15:21:07.000Z', 'parse')
  }

  testCustomFormatWithTimezone() {
    let dateExtended = new DateExtended('2021-02-15T15:21:07Z')
    let formatted = dateExtended.format('dd HH:ss:mm yyyy/MM', 'fr', 'Australia/Sydney')
    assert.deepEqual(formatted, '16 02:07:21 2021/02')

    const iso = DateExtended.fromCustomFormat(formatted, 'dd HH:ss:mm yyyy/MM', 'Australia/Sydney').toISOString()
    assert.deepEqual(iso, '2021-02-15T15:21:07.000Z')
  }
}

runTest(TestDateExtendedTest)
