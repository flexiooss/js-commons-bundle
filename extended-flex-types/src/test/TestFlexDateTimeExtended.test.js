/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexDateTimeExtended} from '../js/FlexDateTimeExtended.js'
import {FlexDateTime} from '../js/__import__flex-types.js'

const assert = require('assert')

export class TestFlexDateTimeExtendedTest extends TestCase {
  debug = true

  testFromNumber() {
    const millis = Date.UTC(2022, 2, 9, 15, 53, 19, 0)
    let iso = FlexDateTimeExtended.fromMillis(millis).toISO()
    assert.deepEqual(iso, '2022-03-09T15:53:19.000')

    const seconds = Math.floor(millis / 1000)
    iso = FlexDateTimeExtended.fromSeconds(seconds).toISO()
    assert.deepEqual(iso, '2022-03-09T15:53:19.000')
  }

  testToNumber() {
    const millis = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').toMillis()
    const seconds = Math.floor(millis / 1000)
    assert.deepEqual(millis, Date.UTC(2022, 2, 9, 15, 53, 19, 0))

    let dt = FlexDateTimeExtended.fromMillis(millis)
    assert.deepEqual(dt.toISO(), '2022-03-09T15:53:19.000')
    assert.deepEqual(dt.toMillis(), millis)
    assert.deepEqual(dt.toSeconds(), seconds)

    dt = FlexDateTimeExtended.fromSeconds(dt.toSeconds())
    assert.deepEqual(dt.toISO(), '2022-03-09T15:53:19.000')
    assert.deepEqual(dt.toMillis(), millis)
    assert.deepEqual(dt.toSeconds(), seconds)
  }

  testFromIso() {
    let flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19.000'))

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19.000'))

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').toISO()
    assert.deepEqual(flexDateTime, '2022-03-09T15:53:19.000')

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.123').toISO()
    assert.deepEqual(flexDateTime, '2022-03-09T15:53:19.123')

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.123456789').toISO()
    assert.deepEqual(flexDateTime, '2022-03-09T15:53:19.123')

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.123456789').toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19.123'))
  }

  testFromFlexDateTime() {
    let flexDateTime = FlexDateTimeExtended.fromFlexDateTime(new FlexDateTime('1992-10-17T04:17:32.123456789')).toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('1992-10-17T04:17:32.123456789'))

    flexDateTime = FlexDateTimeExtended.fromFlexDateTime(new FlexDateTime('1992-10-17T04:17:32.123456789')).toISO()
    assert.deepEqual(flexDateTime, '1992-10-17T04:17:32.123456789')
  }

  testFromIsoWithTimezone() {
    let flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19', 'utc').toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19.000'))

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19Z', 'utc').toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19.000'))

    flexDateTime = FlexDateTimeExtended.fromISO('2022-03-09T12:53:19', 'Australia/Sydney').toISO()
    assert.deepEqual(flexDateTime, '2022-03-09T01:53:19.000')

    flexDateTime = FlexDateTimeExtended.fromISO('2022-08-09T12:53:19', 'Australia/Sydney').toISO()
    assert.deepEqual(flexDateTime, '2022-08-09T02:53:19.000')

    flexDateTime = FlexDateTimeExtended.fromISO('2022-08-09T12:53:19+10:00', 'Australia/Sydney').toISO()
    assert.deepEqual(flexDateTime, '2022-08-09T02:53:19.000')

    flexDateTime = FlexDateTimeExtended.fromISO('2022-08-09T12:53:19+10:00').toISO()
    assert.deepEqual(flexDateTime, '2022-08-09T02:53:19.000')
  }

  testFromFlexTime() {
    let flexDateTime = FlexDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19')).toFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19'))

    flexDateTime = FlexDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19')).toISO()
    assert.deepEqual(flexDateTime, '2022-03-09T15:53:19')
  }

  testNow() {
    const start = new Date()
    const dt = FlexDateTimeExtended.now()

    assert.deepEqual(start.getUTCFullYear(), dt.years())
    assert.deepEqual(start.getUTCMonth() + 1, dt.months())
    assert.deepEqual(start.getUTCDate(), dt.days())

    assert.deepEqual(start.getUTCHours(), dt.hours())
    assert.deepEqual(start.getUTCMinutes(), dt.minutes())
    assert.deepEqual(start.getUTCSeconds(), dt.seconds())
  }

  testGetParts() {
    let dt = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19')
    assert.deepEqual(dt.years(), 2022)
    assert.deepEqual(dt.months(), 3)
    assert.deepEqual(dt.days(), 9)
    assert.deepEqual(dt.hours(), 15)
    assert.deepEqual(dt.minutes(), 53)
    assert.deepEqual(dt.seconds(), 19)
    assert.deepEqual(dt.milliseconds(), 0)
    assert.deepEqual(dt.weekNumber(), 10)
    assert.deepEqual(dt.weekDay(), 3)
    assert.deepEqual(dt.dayOfYear(), 68)

    dt = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.456')
    assert.deepEqual(dt.milliseconds(), 456)
  }

  testSetParts() {
    const dt = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000')
    assert.deepEqual(dt.setYear(1234).toISO(), '1234-03-09T15:53:19.000')
    assert.deepEqual(dt.setMonth(4).toISO(), '2022-04-09T15:53:19.000')
    assert.deepEqual(dt.setDay(4).toISO(), '2022-03-04T15:53:19.000')
    assert.deepEqual(dt.setHour(12).toISO(), '2022-03-09T12:53:19.000')
    assert.deepEqual(dt.setMinute(12).toISO(), '2022-03-09T15:12:19.000')
    assert.deepEqual(dt.setSecond(12).toISO(), '2022-03-09T15:53:12.000')
    assert.deepEqual(dt.setMilliseconds(12).toISO(), '2022-03-09T15:53:19.012')
  }

  testPlus() {
    const dt = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19')
    assert.deepEqual(dt.plusYears(2).toISO(), '2024-03-09T15:53:19.000')
    assert.deepEqual(dt.plusYears(-4).toISO(), '2018-03-09T15:53:19.000')

    assert.deepEqual(dt.plusMonths(2).toISO(), '2022-05-09T15:53:19.000')
    assert.deepEqual(dt.plusMonths(-2).toISO(), '2022-01-09T15:53:19.000')
    assert.deepEqual(dt.plusMonths(24).toISO(), '2024-03-09T15:53:19.000')
    assert.deepEqual(dt.plusMonths(1000).toISO(), '2105-07-09T15:53:19.000')

    assert.deepEqual(dt.plusDays(20).toISO(), '2022-03-29T15:53:19.000')
    assert.deepEqual(dt.plusDays(30).toISO(), '2022-04-08T15:53:19.000')
    assert.deepEqual(dt.plusDays(-1).toISO(), '2022-03-08T15:53:19.000')
    assert.deepEqual(dt.plusDays(10_000).toISO(), '2049-07-25T15:53:19.000')

    assert.deepEqual(dt.plusHours(2).toISO(), '2022-03-09T17:53:19.000')
    assert.deepEqual(dt.plusHours(-4).toISO(), '2022-03-09T11:53:19.000')
    assert.deepEqual(dt.plusHours(12).toISO(), '2022-03-10T03:53:19.000')
    assert.deepEqual(dt.plusHours(72).toISO(), '2022-03-12T15:53:19.000')

    assert.deepEqual(dt.plusMinutes(2).toISO(), '2022-03-09T15:55:19.000')
    assert.deepEqual(dt.plusMinutes(-2).toISO(), '2022-03-09T15:51:19.000')
    assert.deepEqual(dt.plusMinutes(100).toISO(), '2022-03-09T17:33:19.000')
    assert.deepEqual(dt.plusMinutes(1000).toISO(), '2022-03-10T08:33:19.000')

    assert.deepEqual(dt.plusSeconds(20).toISO(), '2022-03-09T15:53:39.000')
    assert.deepEqual(dt.plusSeconds(100).toISO(), '2022-03-09T15:54:59.000')
    assert.deepEqual(dt.plusSeconds(-100).toISO(), '2022-03-09T15:51:39.000')
    assert.deepEqual(dt.plusSeconds(10_000).toISO(), '2022-03-09T18:39:59.000')

    assert.deepEqual(dt.plusMilliseconds(5).toISO(), '2022-03-09T15:53:19.005')
    assert.deepEqual(dt.plusMilliseconds(100).toISO(), '2022-03-09T15:53:19.100')
    assert.deepEqual(dt.plusMilliseconds(-100).toISO(), '2022-03-09T15:53:18.900')
    assert.deepEqual(dt.plusMilliseconds(10_000).toISO(), '2022-03-09T15:53:29.000')
    assert.deepEqual(dt.plusMilliseconds(10_000_000).toISO(), '2022-03-09T18:39:59.000')
    assert.deepEqual(dt.plusMilliseconds(10_000_000_000).toISO(), '2022-07-03T09:39:59.000')
    assert.deepEqual(dt.plusMilliseconds(10_000_000_000_000).toISO(), '2339-01-28T09:39:59.000')

    const iso = dt
      .plusYears(3).plusMonths(6).plusDays(24)
      .plusHours(1).plusMinutes(2).plusSeconds(30).plusMilliseconds(45)
      .toISO()
    assert.deepEqual(iso, '2025-10-03T16:55:49.045')
  }

  testMinus() {
    const dt = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000')
    assert.deepEqual(dt.minusYears(2).toISO(), '2020-03-09T15:53:19.000')
    assert.deepEqual(dt.minusYears(-4).toISO(), '2026-03-09T15:53:19.000')
    // assert.deepEqual(dt.minusYears(3000).toISO(), '-2022-03-09') // todo FlexDate accepte pas les dates avant Jean-Claude -000978-03-09

    assert.deepEqual(dt.minusMonths(2).toISO(), '2022-01-09T15:53:19.000')
    assert.deepEqual(dt.minusMonths(-2).toISO(), '2022-05-09T15:53:19.000')
    assert.deepEqual(dt.minusMonths(24).toISO(), '2020-03-09T15:53:19.000')

    assert.deepEqual(dt.minusDays(5).toISO(), '2022-03-04T15:53:19.000')
    assert.deepEqual(dt.minusDays(-3).toISO(), '2022-03-12T15:53:19.000')
    assert.deepEqual(dt.minusDays(100).toISO(), '2021-11-29T15:53:19.000')
    assert.deepEqual(dt.minusDays(10_000).toISO(), '1994-10-22T15:53:19.000')

    assert.deepEqual(dt.minusHours(2).toISO(), '2022-03-09T13:53:19.000')
    assert.deepEqual(dt.minusHours(-4).toISO(), '2022-03-09T19:53:19.000')
    assert.deepEqual(dt.minusHours(12).toISO(), '2022-03-09T03:53:19.000')
    assert.deepEqual(dt.minusHours(72).toISO(), '2022-03-06T15:53:19.000')

    assert.deepEqual(dt.minusMinutes(2).toISO(), '2022-03-09T15:51:19.000')
    assert.deepEqual(dt.minusMinutes(-2).toISO(), '2022-03-09T15:55:19.000')
    assert.deepEqual(dt.minusMinutes(100).toISO(), '2022-03-09T14:13:19.000')
    assert.deepEqual(dt.minusMinutes(1000).toISO(), '2022-03-08T23:13:19.000')

    assert.deepEqual(dt.minusSeconds(10).toISO(), '2022-03-09T15:53:09.000')
    assert.deepEqual(dt.minusSeconds(-100).toISO(), '2022-03-09T15:54:59.000')
    assert.deepEqual(dt.minusSeconds(100).toISO(), '2022-03-09T15:51:39.000')
    assert.deepEqual(dt.minusSeconds(10_000).toISO(), '2022-03-09T13:06:39.000')

    assert.deepEqual(dt.minusMilliseconds(5).toISO(), '2022-03-09T15:53:18.995')
    assert.deepEqual(dt.minusMilliseconds(100).toISO(), '2022-03-09T15:53:18.900')
    assert.deepEqual(dt.minusMilliseconds(-100).toISO(), '2022-03-09T15:53:19.100')
    assert.deepEqual(dt.minusMilliseconds(10_000).toISO(), '2022-03-09T15:53:09.000')
    assert.deepEqual(dt.minusMilliseconds(10_000_000).toISO(), '2022-03-09T13:06:39.000')
    assert.deepEqual(dt.minusMilliseconds(10_000_000_000).toISO(), '2021-11-13T22:06:39.000')
    assert.deepEqual(dt.minusMilliseconds(100_000_000_000).toISO(), '2019-01-07T06:06:39.000')

    const iso = dt
      .minusYears(34).minusMonths(4).minusDays(6)
      .minusHours(1).minusMinutes(2).minusSeconds(30).minusMilliseconds(45)
      .toISO()
    assert.deepEqual(iso, '1987-11-03T14:50:48.955')
  }

  testComparaison() {
    assert.deepEqual(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000').isBefore(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.001')), true)
    assert.deepEqual(FlexDateTimeExtended.fromISO('2022-03-09T15:54:19.000').isBefore(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000')), false)

    assert.deepEqual(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000').isEquals(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000')), true)
    assert.deepEqual(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000').isEquals(FlexDateTimeExtended.fromISO('2022-03-10T15:53:19.000')), false)

    assert.deepEqual(FlexDateTimeExtended.fromISO('2022-03-09T15:53:20.000').isAfter(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000')), true)
    assert.deepEqual(FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000').isAfter(FlexDateTimeExtended.fromISO('2023-03-09T15:53:19.000')), false)
  }

  testToExtended() {
    const dt = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19.000')
    assert.deepEqual(dt.toDate().toISO(), '2022-03-09')
    assert.deepEqual(dt.toTime().toISO(), '15:53:19.000')
  }

  testFormat() {
    let format = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').format('dd/MM/yyyy HH:mm:ss', 'fr')
    assert.deepEqual(format, '09/03/2022 15:53:19')

    format = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').format('dd/MM/yyyy HH:mm:ss', 'fr', 'utc')
    assert.deepEqual(format, '09/03/2022 15:53:19')

    format = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').format('dd/MM/yyyy HH:mm:ss', 'fr', 'Europe/Paris')
    assert.deepEqual(format, '09/03/2022 16:53:19')

    format = FlexDateTimeExtended.fromISO('2022-03-09T15:53:19').format('dd/MM/yyyy HH:mm:ss', 'fr', 'Australia/Sydney')
    assert.deepEqual(format, '10/03/2022 02:53:19')
  }

}

runTest(TestFlexDateTimeExtendedTest)
