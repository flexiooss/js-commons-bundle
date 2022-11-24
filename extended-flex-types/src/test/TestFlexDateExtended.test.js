/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexDateExtended} from '../js/FlexDateExtended'
import {FlexDate} from '../js/__import__flex-types'

const assert = require('assert')

export class TestFlexDateExtendedTest extends TestCase {
  debug = true

  testFromIso() {
    let flexDate = FlexDateExtended.fromISO('2022-03-09').toFlexDate()
    assert.deepEqual(flexDate, new FlexDate('2022-03-09'))

    flexDate = FlexDateExtended.fromISO('2022-03-09').toFlexDate()
    assert.deepEqual(flexDate, new FlexDate('2022-03-09'))

    flexDate = FlexDateExtended.fromISO('2022-03-09').toISO()
    assert.deepEqual(flexDate, '2022-03-09')
  }

  testFromFlexTime() {
    let flexDate = FlexDateExtended.fromFlexDate(new FlexDate('2022-03-09')).toFlexDate()
    assert.deepEqual(flexDate, new FlexDate('2022-03-09'))

    flexDate = FlexDateExtended.fromFlexDate(new FlexDate('2022-03-09')).toISO()
    assert.deepEqual(flexDate, '2022-03-09')
  }

  testNow() {
    const start = new Date()
    const date = FlexDateExtended.now()

    assert.deepEqual(start.getUTCFullYear(), date.years())
    assert.deepEqual(start.getUTCMonth() + 1, date.months())
    assert.deepEqual(start.getUTCDate(), date.days())
  }

  testGetParts() {
    const date = FlexDateExtended.fromISO('2022-03-09')
    assert.deepEqual(date.years(), 2022)
    assert.deepEqual(date.months(), 3)
    assert.deepEqual(date.days(), 9)
    assert.deepEqual(date.weekNumber(), 10)
    assert.deepEqual(date.weekDay(), 3)
    assert.deepEqual(date.dayOfYear(), 68)
  }

  testSetParts() {
    const date = FlexDateExtended.fromISO('2022-03-09')
    assert.deepEqual(date.setYear(12).toISO(), '0012-03-09')
    assert.deepEqual(date.setYear('2000').toISO(), '2000-03-09')

    assert.deepEqual(date.setMonth(0).toISO(), '2021-12-09')
    assert.deepEqual(date.setMonth('10').toISO(), '2022-10-09')
    assert.deepEqual(date.setMonth(48).toISO(), '2025-12-09')

    assert.deepEqual(date.setDay(12).toISO(), '2022-03-12')
    assert.deepEqual(date.setDay('22').toISO(), '2022-03-22')
    assert.deepEqual(date.setDay(3000).toISO(), '2030-05-17')
  }

  testPlus() {
    const date = FlexDateExtended.fromISO('2022-03-09')
    assert.deepEqual(date.plusYears(2).toISO(), '2024-03-09')
    assert.deepEqual(date.plusYears(-4).toISO(), '2018-03-09')

    assert.deepEqual(date.plusMonths(2).toISO(), '2022-05-09')
    assert.deepEqual(date.plusMonths(-2).toISO(), '2022-01-09')
    assert.deepEqual(date.plusMonths(24).toISO(), '2024-03-09')
    assert.deepEqual(date.plusMonths(1000).toISO(), '2105-07-09')

    assert.deepEqual(date.plusDays(20).toISO(), '2022-03-29')
    assert.deepEqual(date.plusDays(30).toISO(), '2022-04-08')
    assert.deepEqual(date.plusDays(-1).toISO(), '2022-03-08')
    assert.deepEqual(date.plusDays(10_000).toISO(), '2049-07-25')

    const iso = date.plusYears(2).plusMonths(5).plusDays(15).toISO()
    assert.deepEqual(iso, '2024-08-24')
  }

  testMinus() {
    const date = FlexDateExtended.fromISO('2022-03-09')
    assert.deepEqual(date.minusYears(2).toISO(), '2020-03-09')
    assert.deepEqual(date.minusYears(-4).toISO(), '2026-03-09')
    // assert.deepEqual(date.minusYears(3000).toISO(), '-2022-03-09') // todo FlexDate accepte pas les dates avant Jean-Claude -000978-03-09

    assert.deepEqual(date.minusMonths(2).toISO(), '2022-01-09')
    assert.deepEqual(date.minusMonths(-2).toISO(), '2022-05-09')
    assert.deepEqual(date.minusMonths(24).toISO(), '2020-03-09')

    assert.deepEqual(date.minusDays(5).toISO(), '2022-03-04')
    assert.deepEqual(date.minusDays(-3).toISO(), '2022-03-12')
    assert.deepEqual(date.minusDays(100).toISO(), '2021-11-29')
    assert.deepEqual(date.minusDays(10_000).toISO(), '1994-10-22')

    const iso = date.minusYears(1).minusMonths(2).minusDays(3).toISO()
    assert.deepEqual(iso, '2021-01-06')
  }

  testComparaison() {
    assert.deepEqual(FlexDateExtended.fromISO('2022-03-09').isBefore(FlexDateExtended.fromISO('2022-03-10')), true)
    assert.deepEqual(FlexDateExtended.fromISO('2022-03-09').isBefore(FlexDateExtended.fromISO('2020-03-09')), false)

    assert.deepEqual(FlexDateExtended.fromISO('2022-03-09').isEquals(FlexDateExtended.fromISO('2022-03-10')), false)
    assert.deepEqual(FlexDateExtended.fromISO('2022-03-09').isEquals(FlexDateExtended.fromISO('2022-03-09')), true)

    assert.deepEqual(FlexDateExtended.fromISO('2022-03-09').isAfter(FlexDateExtended.fromISO('2023-01-09')), false)
    assert.deepEqual(FlexDateExtended.fromISO('2022-03-09').isAfter(FlexDateExtended.fromISO('2020-03-09')), true)
  }

  testFormat() {
    const format = FlexDateExtended.fromISO('2022-03-09').format('yyyy')
    assert.deepEqual(format, '2022')
  }

}

runTest(TestFlexDateExtendedTest)
