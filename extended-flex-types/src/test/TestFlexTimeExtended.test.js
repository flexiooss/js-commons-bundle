/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexTimeExtended} from '../js/FlexTimeExtended'
import {FlexTime} from '../js/__import__flex-types'

const assert = require('assert')

export class TestFlexTimeExtendedTest extends TestCase {
  debug = true


  testFromIso() {
    let flexTime = FlexTimeExtended.fromISO('15:53:19').toFlexTime()
    assert.deepEqual(flexTime, new FlexTime('15:53:19'))

    flexTime = FlexTimeExtended.fromISO('15:53:19.450').toFlexTime()
    assert.deepEqual(flexTime, new FlexTime('15:53:19.450'))

    flexTime = FlexTimeExtended.fromISO('15:53:19').toISO()
    assert.deepEqual(flexTime, '15:53:19')
  }

  testFromFlexTime() {
    let flexTime = FlexTimeExtended.fromFlexTime(new FlexTime('15:53:19')).toFlexTime()
    assert.deepEqual(flexTime, new FlexTime('15:53:19'))

    flexTime = FlexTimeExtended.fromFlexTime(new FlexTime('15:53:19')).toISO()
    assert.deepEqual(flexTime, '15:53:19')
  }

  testNow() {
    const start = new Date()
    const time = FlexTimeExtended.now()

    assert.deepEqual(start.getUTCHours(), time.hours())
    assert.deepEqual(start.getUTCMinutes(), time.minutes())
    assert.deepEqual(start.getUTCSeconds(), time.seconds())
  }

  testGetParts() {
    let time = FlexTimeExtended.fromISO('15:53:19')
    assert.deepEqual(time.hours(), 15)
    assert.deepEqual(time.minutes(), 53)
    assert.deepEqual(time.seconds(), 19)
    assert.deepEqual(time.milliseconds(), 0)

    time = FlexTimeExtended.fromISO('23:53:19.456')
    assert.deepEqual(time.hours(), 23)
    assert.deepEqual(time.minutes(), 53)
    assert.deepEqual(time.seconds(), 19)
    assert.deepEqual(time.milliseconds(), 456)
  }

  testSetParts() {
    const time = FlexTimeExtended.fromISO('15:53:19')
    assert.deepEqual(time.setHour(12).toISO(), '12:53:19.000')
    assert.deepEqual(time.setHour('22').toISO(), '22:53:19.000')
    assert.deepEqual(time.setHour(24).toISO(), '00:53:19.000')
    assert.deepEqual(time.setHour(48).toISO(), '00:53:19.000')

    assert.deepEqual(time.setMinute(12).toISO(), '15:12:19.000')
    assert.deepEqual(time.setMinute('22').toISO(), '15:22:19.000')
    assert.deepEqual(time.setMinute(60).toISO(), '16:00:19.000')

    assert.deepEqual(time.setSecond(12).toISO(), '15:53:12.000')
    assert.deepEqual(time.setSecond('22').toISO(), '15:53:22.000')
    assert.deepEqual(time.setSecond(3000).toISO(), '16:43:00.000')

    assert.deepEqual(time.setMilliseconds(12).toISO(), '15:53:19.012')
    assert.deepEqual(time.setMilliseconds('22').toISO(), '15:53:19.022')
    assert.deepEqual(time.setMilliseconds('450').toISO(), '15:53:19.450')
    assert.deepEqual(time.setMilliseconds(1450).toISO(), '15:53:20.450')
  }

  testPlus() {
    const time = FlexTimeExtended.fromISO('15:53:19')
    assert.deepEqual(time.plusHours(2).toISO(), '17:53:19.000')
    assert.deepEqual(time.plusHours(-4).toISO(), '11:53:19.000')
    assert.deepEqual(time.plusHours(12).toISO(), '03:53:19.000')
    assert.deepEqual(time.plusHours(72).toISO(), '15:53:19.000')

    assert.deepEqual(time.plusMinutes(2).toISO(), '15:55:19.000')
    assert.deepEqual(time.plusMinutes(-2).toISO(), '15:51:19.000')
    assert.deepEqual(time.plusMinutes(100).toISO(), '17:33:19.000')
    assert.deepEqual(time.plusMinutes(1000).toISO(), '08:33:19.000')

    assert.deepEqual(time.plusSeconds(20).toISO(), '15:53:39.000')
    assert.deepEqual(time.plusSeconds(100).toISO(), '15:54:59.000')
    assert.deepEqual(time.plusSeconds(-100).toISO(), '15:51:39.000')
    assert.deepEqual(time.plusSeconds(10_000).toISO(), '18:39:59.000')

    assert.deepEqual(time.plusMilliseconds(5).toISO(), '15:53:19.005')
    assert.deepEqual(time.plusMilliseconds(100).toISO(), '15:53:19.100')
    assert.deepEqual(time.plusMilliseconds(-100).toISO(), '15:53:18.900')
    assert.deepEqual(time.plusMilliseconds(10_000).toISO(), '15:53:29.000')
    assert.deepEqual(time.plusMilliseconds(10_000_000).toISO(), '18:39:59.000')

    const iso = time.plusHours(1).plusMinutes(2).plusSeconds(30).plusMilliseconds(45).toISO()
    assert.deepEqual(iso, '16:55:49.045')
  }

  testMinus() {
    const time = FlexTimeExtended.fromISO('15:53:19')
    assert.deepEqual(time.minusHours(2).toISO(), '13:53:19.000')
    assert.deepEqual(time.minusHours(-4).toISO(), '19:53:19.000')
    assert.deepEqual(time.minusHours(12).toISO(), '03:53:19.000')
    assert.deepEqual(time.minusHours(72).toISO(), '15:53:19.000')

    assert.deepEqual(time.minusMinutes(2).toISO(), '15:51:19.000')
    assert.deepEqual(time.minusMinutes(-2).toISO(), '15:55:19.000')
    assert.deepEqual(time.minusMinutes(100).toISO(), '14:13:19.000')
    assert.deepEqual(time.minusMinutes(1000).toISO(), '23:13:19.000')

    assert.deepEqual(time.minusSeconds(10).toISO(), '15:53:09.000')
    assert.deepEqual(time.minusSeconds(-100).toISO(), '15:54:59.000')
    assert.deepEqual(time.minusSeconds(100).toISO(), '15:51:39.000')
    assert.deepEqual(time.minusSeconds(10_000).toISO(), '13:06:39.000')

    assert.deepEqual(time.minusMilliseconds(5).toISO(), '15:53:18.995')
    assert.deepEqual(time.minusMilliseconds(100).toISO(), '15:53:18.900')
    assert.deepEqual(time.minusMilliseconds(-100).toISO(), '15:53:19.100')
    assert.deepEqual(time.minusMilliseconds(10_000).toISO(), '15:53:09.000')
    assert.deepEqual(time.minusMilliseconds(10_000_000).toISO(), '13:06:39.000')

    const iso = time.minusHours(1).minusMinutes(2).minusSeconds(30).minusMilliseconds(45).toISO()
    assert.deepEqual(iso, '14:50:48.955')
  }

  testComparaison() {
    assert.deepEqual(FlexTimeExtended.fromISO('15:53:19').isBefore(FlexTimeExtended.fromISO('17:53:19')), true)
    assert.deepEqual(FlexTimeExtended.fromISO('23:59:00').isBefore(FlexTimeExtended.fromISO('00:00:00')), false)

    assert.deepEqual(FlexTimeExtended.fromISO('15:53:19').isEquals(FlexTimeExtended.fromISO('17:53:19')), false)
    assert.deepEqual(FlexTimeExtended.fromISO('15:53:19').isEquals(FlexTimeExtended.fromISO('15:53:19')), true)
    assert.deepEqual(FlexTimeExtended.fromISO('23:59:00').isEquals(FlexTimeExtended.fromISO('00:00:00')), false)

    assert.deepEqual(FlexTimeExtended.fromISO('15:53:19').isAfter(FlexTimeExtended.fromISO('17:53:19')), false)
    assert.deepEqual(FlexTimeExtended.fromISO('23:59:00').isAfter(FlexTimeExtended.fromISO('00:00:00')), true)
  }

  testFormat() {
    const format = FlexTimeExtended.fromISO('15:53:19').format('HH', "fr")
    assert.deepEqual(format, '15')
  }

}

runTest(TestFlexTimeExtendedTest)
