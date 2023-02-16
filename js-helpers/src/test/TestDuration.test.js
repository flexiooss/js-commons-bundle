import {TestCase} from '@flexio-oss/code-altimeter-js'
import {DurationHelper} from '../js/DurationHelper.js'

const assert = require('assert')

export class TestDuration extends TestCase {
  /**
   * @param {Duration} duration
   * @param {number} [days=0]
   * @param {number} [hours=0]
   * @param {number} [minutes=0]
   * @param {number} [seconds=0]
   * @param {number} [milliseconds=0]
   * @throws {AssertionError}
   */
  _assertExplodedDuration(duration, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    assert(duration.milliseconds() === milliseconds)
    assert(duration.seconds() === seconds)
    assert(duration.minutes() === minutes)
    assert(duration.hours() === hours)
    assert(duration.days() === days)
  }

  /**
   * @param {Duration} duration
   */
  _logDuration(duration) {
    console.log(duration.toString())
  }

  testDuration() {
    this._assertExplodedDuration(DurationHelper.explodeDuration(1000),
      0, 0, 0, 1, 0)
  }

  testDurationInSeconds() {
    this._assertExplodedDuration(DurationHelper.explodeDurationInSeconds(1),
      0, 0, 0, 1, 0)
  }

  testDurationDateDiff() {
//    let d = DurationHelper.durationFromDateDiff(
//      new Date('2021-01-01T00:00:00'),
//      new Date('2021-01-02T00:10:00')
//    )
//    this._logDuration(d)

    this._assertExplodedDuration(
      DurationHelper.durationFromDateDiff(
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-01T00:00:01')
      ),
      0, 0, 0, 1, 0)

    this._assertExplodedDuration(
      DurationHelper.durationFromDateDiff(
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-01T00:00:01'),
        5000
      ),
      0, 0, 0, 6, 0)


    this._assertExplodedDuration(
      DurationHelper.durationFromDateDiff(
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-02T00:00:00')
      ),
      1, 0, 0, 0, 0)


  }

  testWithoutDays() {
    let d1 = DurationHelper.durationFromDateDiff(
      new Date('2021-01-01T00:00:00'),
      new Date('2021-01-02T00:10:00')
    )

    let d2 = DurationHelper.explodeDuration(d1.durationWithoutDays())

    console.assert(
      d2.duration() === DurationHelper.implodeDuration(0, 0, 10)
    )

  }
}

runTest(TestDuration)
