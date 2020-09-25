import {assertType, isDate, isNull, TypeCheck} from '../../../assert'

export class DurationHelper {
  /**
   * @type {number}
   */
  static SECONDS_IN_A_DAY = 86400
  /**
   * @type {number}
   */
  static  SECONDS_IN_AN_HOUR = 3600
  /**
   * @type {number}
   */
  static  SECONDS_IN_A_MINUTE = 60

  /**
   * @param {number} [days=0]
   * @param {number} [hours=0]
   * @param {number} [minutes=0]
   * @param {number} [seconds=0]
   * @return {number}
   */
  static implodeDuration(days = 0, hours = 0, minutes = 0, seconds = 0) {
    let duration = 0
    duration += TypeCheck.assertIsNumber(days) * DurationHelper.SECONDS_IN_A_DAY
    duration += TypeCheck.assertIsNumber(hours) * DurationHelper.SECONDS_IN_AN_HOUR
    duration += TypeCheck.assertIsNumber(minutes) * DurationHelper.SECONDS_IN_A_MINUTE
    duration += TypeCheck.assertIsNumber(seconds)
    return duration
  }

  /**
   * @param  {number} duration
   * @return {Duration}
   */
  static explodeDuration(duration) {
    return new Duration(duration)
  }

  /**
   * @param {Date} dateStart
   * @param {Date} [dateEnd=new Date()]
   * @param {?number} lag
   * @return {Duration}
   */
  static durationFromDateDiff(dateStart, dateEnd = new Date(), lag = 0) {
    assertType(isDate(dateStart) && isDate(dateEnd), '`dateStart, dateEnd` should be `Date`')
    if (isNull(lag)) {
      lag = 0
    } else {
      TypeCheck.assertIsNumber(lag)
    }

    return new Duration(~~(((dateEnd.getTime() - dateStart.getTime()) / 1000) + lag))
  }

}

class Duration {
  /**
   * @type {number}
   */
  #duration

  /**
   * @param {?number} duration
   */
  constructor(duration) {
    if (!isNull(duration)) {
      TypeCheck.assertIsNumber(duration)
    }
    this.#duration = duration
  }

  /**
   * @return {?number}
   */
  seconds() {
    if (isNull(this.#duration)) {
      return null
    }
    return (this.#duration % DurationHelper.SECONDS_IN_A_MINUTE)
  }

  /**
   * @param {number} padStart
   * @return {?string}
   */
  secondsString(padStart = 2) {
    if (isNull(this.#duration)) {
      return null
    }
    return this.seconds().toString().padStart(padStart, '0')
  }

  /**
   * @return {?number}
   */
  minutes() {
    if (isNull(this.#duration)) {
      return null
    }
    return ~~((this.#duration % DurationHelper.SECONDS_IN_AN_HOUR) / DurationHelper.SECONDS_IN_A_MINUTE)
  }

  /**
   * @param {number} padStart
   * @return {?string}
   */
  minutesString(padStart = 2) {
    if (isNull(this.#duration)) {
      return null
    }
    return this.minutes().toString().padStart(padStart, '0')
  }

  /**
   * @return {?number}
   */
  hours() {
    if (isNull(this.#duration)) {
      return null
    }
    return ~~((this.#duration % DurationHelper.SECONDS_IN_A_DAY) / DurationHelper.SECONDS_IN_AN_HOUR)
  }

  /**
   * @param {number} padStart
   * @return {?string}
   */
  hoursString(padStart = 2) {
    if (isNull(this.#duration)) {
      return null
    }
    return this.hours().toString().padStart(padStart, '0')
  }

  /**
   * @return {?number}
   */
  days() {
    if (isNull(this.#duration)) {
      return null
    }
    return ~~(this.#duration / DurationHelper.SECONDS_IN_A_DAY)
  }

  /**
   * @param {number} padStart
   * @return {?string}
   */
  daysString(padStart = 0) {
    if (isNull(this.#duration)) {
      return null
    }
    return this.days().toString().padStart(padStart, '0')
  }

  /**
   * @return {?number}
   */
  duration() {
    return this.#duration
  }

  /**
   * @return {?number}
   */
  durationWithoutDays() {
    if (isNull(this.#duration)) {
      return null
    }
    /**
     * @type {number}
     */
    let duration = 0
    duration += this.hours() * DurationHelper.SECONDS_IN_AN_HOUR
    duration += this.minutes() * DurationHelper.SECONDS_IN_A_MINUTE
    duration += this.seconds()
    return duration
  }
}
