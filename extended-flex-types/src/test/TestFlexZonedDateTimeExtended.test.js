/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexZonedDateTimeExtended} from '../js/FlexZonedDateTimeExtended.js'
import {FlexDateTime, FlexZonedDateTime} from '../../../flex-types/index.js'

const assert = require('assert')

export class TestFlexZonedDateTimeExtended extends TestCase {
  debug = true

  testFromFlexZonedDateTime() {
    let flexDateTime = FlexZonedDateTimeExtended.fromFlexZonedDateTime(new FlexZonedDateTime('2022-03-09T15:53:19+01:00')).toUTCFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T14:53:19.000'))

    flexDateTime = FlexZonedDateTimeExtended.fromFlexZonedDateTime(new FlexZonedDateTime('2022-03-09T15:53:19+02:00')).toUTCFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T13:53:19.000'))

    flexDateTime = FlexZonedDateTimeExtended.fromFlexZonedDateTime(new FlexZonedDateTime('2022-03-09T15:53:19+01:30')).toUTCFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T14:23:19.000'))
  }

  testFromIsoWithTimezone() {
    let flexDateTime = FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19Z').toUTCFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T15:53:19.000'))

    flexDateTime = FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19+01:00').toUTCFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T14:53:19.000'))

    flexDateTime = FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19+01:30').toUTCFlexDateTime()
    assert.deepEqual(flexDateTime, new FlexDateTime('2022-03-09T14:23:19.000'))
  }


  testFromDateTimeWithTimezone() {
    let flexDateTime = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19'), 'utc')
    assert.deepEqual(flexDateTime.toUTCFlexDateTime(), new FlexDateTime('2022-03-09T15:53:19.000'))
    assert.deepEqual(flexDateTime.toISO(), '2022-03-09T15:53:19.000Z')

    flexDateTime = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19'), 'Europe/Paris')
    assert.deepEqual(flexDateTime.toUTCFlexDateTime(), new FlexDateTime('2022-03-09T14:53:19.000'))
    assert.deepEqual(flexDateTime.toISO(), '2022-03-09T15:53:19.000+01:00')

    flexDateTime = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T12:53:19'), 'Australia/Sydney')
    assert.deepEqual(flexDateTime.toUTCFlexDateTime(), new FlexDateTime('2022-03-09T01:53:19.000'))
    assert.deepEqual(flexDateTime.toISO(), '2022-03-09T12:53:19.000+11:00')
  }


  testGetParts() {
    let dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.456'), 'Europe/Paris')
    assert.deepEqual(dt.toUTCFlexDateTime(), new FlexDateTime('2022-03-09T14:53:19.000'))

    assert.deepEqual(dt.years(), 2022)
    assert.deepEqual(dt.months(), 3)
    assert.deepEqual(dt.days(), 9)
    assert.deepEqual(dt.hours(), 15)
    assert.deepEqual(dt.minutes(), 53)
    assert.deepEqual(dt.seconds(), 19)
    assert.deepEqual(dt.milliseconds(), 456)
    assert.deepEqual(dt.weekNumber(), 10)
    assert.deepEqual(dt.weekDay(), 3)
    assert.deepEqual(dt.dayOfYear(), 68)
  }

  testSetPartsUTC() {
    const dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'))

    assert.deepEqual(dt.setYear(1234).toISO(), '1234-03-09T15:53:19.000Z')
    assert.deepEqual(dt.setMonth(4).toISO(), '2022-04-09T15:53:19.000Z')
    assert.deepEqual(dt.setDay(4).toISO(), '2022-03-04T15:53:19.000Z')
    assert.deepEqual(dt.setHour(12).toISO(), '2022-03-09T12:53:19.000Z')
    assert.deepEqual(dt.setMinute(12).toISO(), '2022-03-09T15:12:19.000Z')
    assert.deepEqual(dt.setSecond(12).toISO(), '2022-03-09T15:53:12.000Z')
    assert.deepEqual(dt.setMilliseconds(12).toISO(), '2022-03-09T15:53:19.012Z')
  }


  testSetPartsWithTimezone() {
    const dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')

    assert.deepEqual(dt.setYear(2020).toISO(), '2020-03-09T15:53:19.000+01:00')
    assert.deepEqual(dt.setYear(2020).toUTCFlexDateTime(), new FlexDateTime('2020-03-09T14:53:19.000'))
    assert.deepEqual(dt.setMonth(4).toISO(), '2022-04-09T15:53:19.000+02:00')
    assert.deepEqual(dt.setDay(4).toISO(), '2022-03-04T15:53:19.000+01:00')
    assert.deepEqual(dt.setHour(12).toISO(), '2022-03-09T12:53:19.000+01:00')
    assert.deepEqual(dt.setMinute(12).toISO(), '2022-03-09T15:12:19.000+01:00')
    assert.deepEqual(dt.setSecond(12).toISO(), '2022-03-09T15:53:12.000+01:00')
    assert.deepEqual(dt.setMilliseconds(12).toISO(), '2022-03-09T15:53:19.012+01:00')
  }


  testPlusUTC() {
    const dt = FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z')
    assert.deepEqual(dt.plusYears(2).toISO(), '2024-03-09T15:53:19.000Z')
    assert.deepEqual(dt.plusYears(-4).toISO(), '2018-03-09T15:53:19.000Z')

    assert.deepEqual(dt.plusMonths(2).toISO(), '2022-05-09T15:53:19.000Z')
    assert.deepEqual(dt.plusMonths(-2).toISO(), '2022-01-09T15:53:19.000Z')
    assert.deepEqual(dt.plusMonths(24).toISO(), '2024-03-09T15:53:19.000Z')
    assert.deepEqual(dt.plusMonths(1000).toISO(), '2105-07-09T15:53:19.000Z')

    assert.deepEqual(dt.plusDays(20).toISO(), '2022-03-29T15:53:19.000Z')
    assert.deepEqual(dt.plusDays(30).toISO(), '2022-04-08T15:53:19.000Z')
    assert.deepEqual(dt.plusDays(-1).toISO(), '2022-03-08T15:53:19.000Z')
    assert.deepEqual(dt.plusDays(10_000).toISO(), '2049-07-25T15:53:19.000Z')

    assert.deepEqual(dt.plusHours(2).toISO(), '2022-03-09T17:53:19.000Z')
    assert.deepEqual(dt.plusHours(-4).toISO(), '2022-03-09T11:53:19.000Z')
    assert.deepEqual(dt.plusHours(12).toISO(), '2022-03-10T03:53:19.000Z')
    assert.deepEqual(dt.plusHours(72).toISO(), '2022-03-12T15:53:19.000Z')

    assert.deepEqual(dt.plusMinutes(2).toISO(), '2022-03-09T15:55:19.000Z')
    assert.deepEqual(dt.plusMinutes(-2).toISO(), '2022-03-09T15:51:19.000Z')
    assert.deepEqual(dt.plusMinutes(100).toISO(), '2022-03-09T17:33:19.000Z')
    assert.deepEqual(dt.plusMinutes(1000).toISO(), '2022-03-10T08:33:19.000Z')

    assert.deepEqual(dt.plusSeconds(20).toISO(), '2022-03-09T15:53:39.000Z')
    assert.deepEqual(dt.plusSeconds(100).toISO(), '2022-03-09T15:54:59.000Z')
    assert.deepEqual(dt.plusSeconds(-100).toISO(), '2022-03-09T15:51:39.000Z')
    assert.deepEqual(dt.plusSeconds(10_000).toISO(), '2022-03-09T18:39:59.000Z')

    assert.deepEqual(dt.plusMilliseconds(5).toISO(), '2022-03-09T15:53:19.005Z')
    assert.deepEqual(dt.plusMilliseconds(100).toISO(), '2022-03-09T15:53:19.100Z')
    assert.deepEqual(dt.plusMilliseconds(-100).toISO(), '2022-03-09T15:53:18.900Z')
    assert.deepEqual(dt.plusMilliseconds(10_000).toISO(), '2022-03-09T15:53:29.000Z')
    assert.deepEqual(dt.plusMilliseconds(10_000_000).toISO(), '2022-03-09T18:39:59.000Z')
    assert.deepEqual(dt.plusMilliseconds(10_000_000_000).toISO(), '2022-07-03T09:39:59.000Z')
    assert.deepEqual(dt.plusMilliseconds(10_000_000_000_000).toISO(), '2339-01-28T09:39:59.000Z')

    const iso = dt
      .plusYears(3).plusMonths(6).plusDays(24)
      .plusHours(1).plusMinutes(2).plusSeconds(30).plusMilliseconds(45)
      .toISO()
    assert.deepEqual(iso, '2025-10-03T16:55:49.045Z')
  }


  testPlusWithTimezone() {
    const dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')
    assert.deepEqual(dt.plusYears(2).toISO(), '2024-03-09T15:53:19.000+01:00')
    assert.deepEqual(dt.plusYears(-4).toISO(), '2018-03-09T15:53:19.000+01:00')

    assert.deepEqual(dt.plusMonths(2).toISO(), '2022-05-09T15:53:19.000+02:00')
    assert.deepEqual(dt.plusMonths(-2).toISO(), '2022-01-09T15:53:19.000+01:00')
    assert.deepEqual(dt.plusMonths(24).toISO(), '2024-03-09T15:53:19.000+01:00')
    assert.deepEqual(dt.plusMonths(1000).toISO(), '2105-07-09T15:53:19.000+02:00')

    assert.deepEqual(dt.plusDays(20).toISO(), '2022-03-29T15:53:19.000+02:00')
    assert.deepEqual(dt.plusDays(30).toISO(), '2022-04-08T15:53:19.000+02:00')
    assert.deepEqual(dt.plusDays(-1).toISO(), '2022-03-08T15:53:19.000+01:00')
    assert.deepEqual(dt.plusDays(10_000).toISO(), '2049-07-25T15:53:19.000+02:00')

    assert.deepEqual(dt.plusHours(2).toISO(), '2022-03-09T17:53:19.000+01:00')
    assert.deepEqual(dt.plusHours(-4).toISO(), '2022-03-09T11:53:19.000+01:00')
    assert.deepEqual(dt.plusHours(12).toISO(), '2022-03-10T03:53:19.000+01:00')
    assert.deepEqual(dt.plusHours(72).toISO(), '2022-03-12T15:53:19.000+01:00')

    assert.deepEqual(dt.plusMinutes(2).toISO(), '2022-03-09T15:55:19.000+01:00')
    assert.deepEqual(dt.plusMinutes(-2).toISO(), '2022-03-09T15:51:19.000+01:00')
    assert.deepEqual(dt.plusMinutes(100).toISO(), '2022-03-09T17:33:19.000+01:00')
    assert.deepEqual(dt.plusMinutes(1000).toISO(), '2022-03-10T08:33:19.000+01:00')

    assert.deepEqual(dt.plusSeconds(20).toISO(), '2022-03-09T15:53:39.000+01:00')
    assert.deepEqual(dt.plusSeconds(100).toISO(), '2022-03-09T15:54:59.000+01:00')
    assert.deepEqual(dt.plusSeconds(-100).toISO(), '2022-03-09T15:51:39.000+01:00')
    assert.deepEqual(dt.plusSeconds(10_000).toISO(), '2022-03-09T18:39:59.000+01:00')

    assert.deepEqual(dt.plusMilliseconds(5).toISO(), '2022-03-09T15:53:19.005+01:00')
    assert.deepEqual(dt.plusMilliseconds(100).toISO(), '2022-03-09T15:53:19.100+01:00')
    assert.deepEqual(dt.plusMilliseconds(-100).toISO(), '2022-03-09T15:53:18.900+01:00')
    assert.deepEqual(dt.plusMilliseconds(10_000).toISO(), '2022-03-09T15:53:29.000+01:00')
    assert.deepEqual(dt.plusMilliseconds(10_000_000).toISO(), '2022-03-09T18:39:59.000+01:00')
    assert.deepEqual(dt.plusMilliseconds(10_000_000_000).toISO(), '2022-07-03T10:39:59.000+02:00')
    assert.deepEqual(dt.plusMilliseconds(10_000_000_000_000).toISO(), '2339-01-28T09:39:59.000+01:00')

    const iso = dt
      .plusYears(3).plusMonths(6).plusDays(24)
      .plusHours(1).plusMinutes(2).plusSeconds(30).plusMilliseconds(45)
      .toISO()
    assert.deepEqual(iso, '2025-10-03T16:55:49.045+02:00')
  }


  testMinusWithTimezone() {
    const dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')
    assert.deepEqual(dt.minusYears(2).toISO(), '2020-03-09T15:53:19.000+01:00')
    assert.deepEqual(dt.minusYears(-4).toISO(), '2026-03-09T15:53:19.000+01:00')
    // assert.deepEqual(dt.minusYears(3000).toISO(), '-2022-03-09') // todo FlexDate accepte pas les dates avant Jean-Claude -000978-03-09

    assert.deepEqual(dt.minusMonths(2).toISO(), '2022-01-09T15:53:19.000+01:00')
    assert.deepEqual(dt.minusMonths(-2).toISO(), '2022-05-09T15:53:19.000+02:00')
    assert.deepEqual(dt.minusMonths(24).toISO(), '2020-03-09T15:53:19.000+01:00')

    assert.deepEqual(dt.minusDays(5).toISO(), '2022-03-04T15:53:19.000+01:00')
    assert.deepEqual(dt.minusDays(-3).toISO(), '2022-03-12T15:53:19.000+01:00')
    assert.deepEqual(dt.minusDays(100).toISO(), '2021-11-29T15:53:19.000+01:00')
    assert.deepEqual(dt.minusDays(10_000).toISO(), '1994-10-22T15:53:19.000+01:00')

    assert.deepEqual(dt.minusHours(2).toISO(), '2022-03-09T13:53:19.000+01:00')
    assert.deepEqual(dt.minusHours(-4).toISO(), '2022-03-09T19:53:19.000+01:00')
    assert.deepEqual(dt.minusHours(12).toISO(), '2022-03-09T03:53:19.000+01:00')
    assert.deepEqual(dt.minusHours(72).toISO(), '2022-03-06T15:53:19.000+01:00')

    assert.deepEqual(dt.minusMinutes(2).toISO(), '2022-03-09T15:51:19.000+01:00')
    assert.deepEqual(dt.minusMinutes(-2).toISO(), '2022-03-09T15:55:19.000+01:00')
    assert.deepEqual(dt.minusMinutes(100).toISO(), '2022-03-09T14:13:19.000+01:00')
    assert.deepEqual(dt.minusMinutes(1000).toISO(), '2022-03-08T23:13:19.000+01:00')

    assert.deepEqual(dt.minusSeconds(10).toISO(), '2022-03-09T15:53:09.000+01:00')
    assert.deepEqual(dt.minusSeconds(-100).toISO(), '2022-03-09T15:54:59.000+01:00')
    assert.deepEqual(dt.minusSeconds(100).toISO(), '2022-03-09T15:51:39.000+01:00')
    assert.deepEqual(dt.minusSeconds(10_000).toISO(), '2022-03-09T13:06:39.000+01:00')

    assert.deepEqual(dt.minusMilliseconds(5).toISO(), '2022-03-09T15:53:18.995+01:00')
    assert.deepEqual(dt.minusMilliseconds(100).toISO(), '2022-03-09T15:53:18.900+01:00')
    assert.deepEqual(dt.minusMilliseconds(-100).toISO(), '2022-03-09T15:53:19.100+01:00')
    assert.deepEqual(dt.minusMilliseconds(10_000).toISO(), '2022-03-09T15:53:09.000+01:00')
    assert.deepEqual(dt.minusMilliseconds(10_000_000).toISO(), '2022-03-09T13:06:39.000+01:00')
    assert.deepEqual(dt.minusMilliseconds(10_000_000_000).toISO(), '2021-11-13T22:06:39.000+01:00')
    assert.deepEqual(dt.minusMilliseconds(100_000_000_000).toISO(), '2019-01-07T06:06:39.000+01:00')

    const iso = dt
      .minusYears(34).minusMonths(4).minusDays(6)
      .minusHours(1).minusMinutes(2).minusSeconds(30).minusMilliseconds(45)
      .toISO()
    assert.deepEqual(iso, '1987-11-03T14:50:48.955+01:00')
  }

  testComparaison() {
    assert.deepEqual(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z').isBefore(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.001Z')), true)
    assert.deepEqual(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:54:19.000Z').isBefore(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z')), false)
    assert.deepEqual(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-02-09T15:54:19.000'), 'Europe/Paris')
      .isBefore(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')), true)
    assert.deepEqual(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:54:19.000'), 'Europe/Paris')
      .isBefore(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')), false)

    assert.deepEqual(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z').isEquals(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z')), true)
    assert.deepEqual(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z').isEquals(FlexZonedDateTimeExtended.fromISO('2022-03-10T15:53:19.000Z')), false)
    assert.deepEqual(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')
      .isEquals(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:54:19.000'), 'Europe/Paris')), false)
    assert.deepEqual(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')
      .isEquals(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')), true)

    assert.deepEqual(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:20.000Z').isAfter(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z')), true)
    assert.deepEqual(FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19.000Z').isAfter(FlexZonedDateTimeExtended.fromISO('2023-03-09T15:53:19.000Z')), false)
    assert.deepEqual(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T16:53:19.000'), 'Europe/Paris')
      .isAfter(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')), true)
    assert.deepEqual(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T14:53:19.000'), 'Europe/Paris')
      .isAfter(FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')), false)
  }

  testToExtended() {
    const dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T00:53:19.000'), 'Europe/Paris')
    assert.deepEqual(dt.toUTCFlexDateTime().toJSON(), '2022-03-08T23:53:19.000')

    assert.deepEqual(dt.toUTCDateTime().toJSON(), '2022-03-08T23:53:19.000')

    assert.deepEqual(dt.toUTCDate().toISO(), '2022-03-08')
    assert.deepEqual(dt.toUTCTime().toISO(), '23:53:19.000')
    assert.deepEqual(dt.toLocalDate().toISO(), '2022-03-09')
    assert.deepEqual(dt.toLocalTime().toISO(), '00:53:19.000')
  }


  testToZone() {
    const dt = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19.000'), 'Europe/Paris')
    assert.deepEqual(dt.toUTCFlexDateTime(), new FlexDateTime('2022-03-09T14:53:19.000'))
    assert.deepEqual(dt.toISO(), '2022-03-09T15:53:19.000+01:00')

    assert.deepEqual(dt.atZoneSameInstant('UTC').toUTCFlexDateTime(), new FlexDateTime('2022-03-09T14:53:19.000'))
    assert.deepEqual(dt.atZoneSameInstant('UTC').toISO(), '2022-03-09T14:53:19.000Z')

    assert.deepEqual(dt.atZoneSameInstant('America/Chicago').toUTCFlexDateTime(), new FlexDateTime('2022-03-09T14:53:19.000'))
    assert.deepEqual(dt.atZoneSameInstant('America/Chicago').toISO(), '2022-03-09T08:53:19.000-06:00')

  }

  testFormat() {
    const dtUTC = FlexZonedDateTimeExtended.fromISO('2022-03-09T15:53:19Z')
    assert.deepEqual(dtUTC.format('dd/MM/yyyy HH:mm:ss', 'fr'), '09/03/2022 15:53:19')
    assert.deepEqual(dtUTC.format('dd/MM/yyyy HH:mm:ss z', 'fr'), '09/03/2022 15:53:19 UTC')

    const dtParis = FlexZonedDateTimeExtended.fromFlexDateTime(new FlexDateTime('2022-03-09T15:53:19'), 'Europe/Paris')
    assert.deepEqual(dtParis.format('dd/MM/yyyy HH:mm:ss', 'fr'), '09/03/2022 15:53:19')

    assert.deepEqual(dtParis.format('dd/MM/yyyy HH:mm:ss z', 'fr'), '09/03/2022 15:53:19 Europe/Paris')
  }
}

runTest(TestFlexZonedDateTimeExtended)
