import {FlexTime, TypeCheck} from './__import__flex-types.js'
import {DateTime, Duration as TimeFormat} from 'luxon'
import {TimeFormatter} from './date-formatter/DateFormatter.js'
import {isNull, isString} from "../../../assert/index.js";

export class FlexTimeExtended {
  /**
   * @type {FlexTime}
   */
  #time
  /**
   * @type {?TimeParts}
   */
  #timeParts = null

  /**
   * @param {FlexTime} flexTime
   */
  constructor(flexTime) {
    TypeCheck.assertIsFlexTime(flexTime)
    this.#time = flexTime
  }

  /**
   * @return {FlexTimeExtended}
   */
  static now(timezone = 'utc') {
    const iso = DateTime.local().setZone(timezone).toISOTime({includeOffset: false})
    return FlexTimeExtended.fromISO(iso)
  }

  /**
   * @return {TimeParts}
   */
  #getTimeParts() {
    if (isNull(this.#timeParts)) {
      this.#timeParts = TimeParts.fromFlexTime(this.#time);
    }

    return this.#timeParts;
  }

  /**
   * @param {FlexTime} flexTime
   */
  static fromFlexTime(flexTime) {
    return new FlexTimeExtended(flexTime)
  }

  /**
   * @param {string} date
   * @return {FlexTimeExtended}
   */
  static fromISO(date) {
    const flexTime = new FlexTime(date)
    return new FlexTimeExtended(flexTime)
  }

  /**
   * @return {number}
   */
  hours() {
    return this.#getTimeParts().hours();
  }

  /**
   * @return {number}
   */
  minutes() {
    return this.#getTimeParts().minutes();
  }

  /**
   * @return {number}
   */
  seconds() {
    return this.#getTimeParts().seconds();
  }

  /**
   * @return {number}
   */
  milliseconds() {
    return this.#getTimeParts().milliseconds();
  }

  /**
   * @param {string|number} hours
   * @return {FlexTimeExtended}
   */
  setHour(hours) {
    return FlexTimeExtended.fromFlexTime(new FlexTime(`00:${this.minutes().toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds()}`)).plusHours(hours);
  }

  /**
   * @param {number} [milliseconds = null]
   * @return {string}
   */
  #formatMilliseconds(milliseconds = null) {
    milliseconds = milliseconds ?? this.milliseconds();
    /**
     * @type {string}
     */
    const msFormated = '.' + milliseconds.toString().padStart(3, '0');
    return this.#getTimeParts().nanoseconds() !== 0 ? msFormated + this.#getTimeParts().nanoseconds().toString() : msFormated;
  }


  /**
   * @param {string|number} minutes
   * @return {FlexTimeExtended}
   */
  setMinute(minutes) {
    return FlexTimeExtended.fromFlexTime(new FlexTime(`${this.hours().toString().padStart(2, '0')}:00:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds()}`)).plusMinutes(minutes);
  }

  /**
   * @param {string|number} seconds
   * @return {FlexTimeExtended}
   */
  setSecond(seconds) {
    return FlexTimeExtended.fromFlexTime(new FlexTime(`${this.hours().toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:00${this.#formatMilliseconds()}`)).plusSeconds(seconds);
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexTimeExtended}
   */
  setMilliseconds(milliseconds) {
    return FlexTimeExtended.fromFlexTime(new FlexTime(`${this.hours().toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds(0)}`)).plusMilliseconds(milliseconds);
  }

  /**
   * @param {string|number} hours
   * @return {FlexTimeExtended}
   */
  plusHours(hours) {
    hours = isString(hours) ? parseInt(hours) : hours;
    if (hours === 0) return this;
    if (hours < 0) return this.minusHours(Math.abs(hours));

    return FlexTimeExtended.fromFlexTime(new FlexTime(`${this.#addMax24Hours(this.hours(), hours).toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds()}`));
  }

  /**
   * @param {number} initialValue
   * @param {number} addHours
   * @return number
   */
  #addMax24Hours(initialValue, addHours) {
    if (addHours === 0) return initialValue;

    /**
     * @type {number}
     */
    const realValue = addHours % 24;
    return (initialValue + realValue) > 24
      ? Math.abs(24 - (initialValue + realValue))
      : initialValue + realValue;
  }

  /**
   * @param {number} initialValue
   * @param {number} minusHours
   * @return number
   */
  #minusMax24Hours(initialValue, minusHours) {
    if (minusHours === 0) return initialValue;

    /**
     * @type {number}
     */
    const realValue = minusHours % 24;
    return (initialValue - realValue) < 0
      ? 24 - Math.abs(initialValue - realValue)
      : initialValue - realValue;
  }

  /**
   * @param {string|number} minutes
   * @return {FlexTimeExtended}
   */
  plusMinutes(minutes) {
    minutes = isString(minutes) ? parseInt(minutes) : minutes;
    if (minutes === 0) return this;
    if (minutes < 0) return this.minusMinutes(Math.abs(minutes));

    let hoursToAdd = Math.trunc(minutes / 60);
    /**
     * @type {number}
     */
    let minutesPart = minutes % 60;

    minutesPart = this.minutes() + minutesPart
    if (minutesPart > 60) {
      minutesPart = minutesPart - 60;
      hoursToAdd++;
    }

    /**
     * @type {FlexTimeExtended}
     */
    const ret = FlexTimeExtended.fromFlexTime(
      new FlexTime(`${this.hours().toString().padStart(2, '0')}:${minutesPart.toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds()}`)
    );

    if (hoursToAdd === 0) return ret;
    return ret.plusHours(hoursToAdd);
  }

  /**
   * @param {string|number} seconds
   * @return {FlexTimeExtended}
   */
  plusSeconds(seconds) {
    seconds = isString(seconds) ? parseInt(seconds) : seconds;
    if (seconds === 0) return this;
    if (seconds < 0) return this.minusSeconds(Math.abs(seconds));

    let minutesToAdd = Math.trunc(seconds / 60);
    /**
     * @type {number}
     */
    let secondsPart = seconds % 60;

    secondsPart = this.seconds() + secondsPart
    if (secondsPart > 60) {
      secondsPart = secondsPart - 60;
      minutesToAdd++;
    }

    /**
     * @type {FlexTimeExtended}
     */
    const ret = FlexTimeExtended.fromFlexTime(
      new FlexTime(`${this.hours().toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${secondsPart.toString().padStart(2, '0')}${this.#formatMilliseconds()}`)
    );

    if (minutesToAdd === 0) return ret;
    return ret.plusMinutes(minutesToAdd);
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexTimeExtended}
   */
  plusMilliseconds(milliseconds) {
    milliseconds = isString(milliseconds) ? parseInt(milliseconds) : milliseconds;
    if (milliseconds === 0) return this;
    if (milliseconds < 0) return this.minusMilliseconds(Math.abs(milliseconds));

    let secondsToAdd = Math.trunc(milliseconds / 1000);
    /**
     * @type {number}
     */
    let millisecondsPart = milliseconds % 1000;
    millisecondsPart = this.milliseconds() + millisecondsPart
    if (millisecondsPart > 1000) {
      millisecondsPart = millisecondsPart - 1000;
      secondsToAdd++;
    }

    /**
     * @type {FlexTimeExtended}
     */
    const ret = FlexTimeExtended.fromFlexTime(
      new FlexTime(`${this.hours().toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds(millisecondsPart)}`)
    );

    if (secondsToAdd === 0) return ret;
    return ret.plusSeconds(secondsToAdd);
  }

  /**
   * @param {string|number} hours
   * @return {FlexTimeExtended}
   */
  minusHours(hours) {
    hours = isString(hours) ? parseInt(hours) : hours;
    if (hours === 0) return this;
    if (hours < 0) return this.plusHours(Math.abs(hours));

    return FlexTimeExtended.fromFlexTime(new FlexTime(`${this.#minusMax24Hours(this.hours(), hours).toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds()}`));
  }

  /**
   * @param {string|number} minutes
   * @return {FlexTimeExtended}
   */
  minusMinutes(minutes) {
    minutes = isString(minutes) ? parseInt(minutes) : minutes;
    if (minutes === 0) return this;
    if (minutes < 0) return this.plusMinutes(Math.abs(minutes));

    let hoursToMinus = Math.trunc(minutes / 60);
    /**
     * @type {number}
     */
    let minutesPart = minutes % 60;

    minutesPart = this.minutes() - minutesPart
    if (minutesPart < 0) {
      minutesPart = 60 + minutesPart;
      hoursToMinus++;
    }

    /**
     * @type {FlexTimeExtended}
     */
    const ret = FlexTimeExtended.fromFlexTime(
      new FlexTime(`${this.hours().toString().padStart(2, '0')}:${minutesPart.toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds()}`)
    );

    if (hoursToMinus === 0) return ret;
    return ret.minusHours(hoursToMinus);
  }

  /**
   * @param {string|number} seconds
   * @return {FlexTimeExtended}
   */
  minusSeconds(seconds) {
    seconds = isString(seconds) ? parseInt(seconds) : seconds;
    if (seconds === 0) return this;
    if (seconds < 0) return this.plusSeconds(Math.abs(seconds));

    let minutesToMinus = Math.trunc(seconds / 60);
    /**
     * @type {number}
     */
    let secondsPart = seconds % 60;

    secondsPart = this.seconds() - secondsPart
    if (secondsPart < 0) {
      secondsPart = 60 + secondsPart;
      minutesToMinus++;
    }

    /**
     * @type {FlexTimeExtended}
     */
    const ret = FlexTimeExtended.fromFlexTime(
      new FlexTime(`${this.hours().toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${secondsPart.toString().padStart(2, '0')}${this.#formatMilliseconds()}`)
    );

    if (minutesToMinus === 0) return ret;
    return ret.minusMinutes(minutesToMinus);
  }

  /**
   * @param {string|number} milliseconds
   * @return {FlexTimeExtended}
   */
  minusMilliseconds(milliseconds) {
    milliseconds = isString(milliseconds) ? parseInt(milliseconds) : milliseconds;
    if (milliseconds === 0) return this;
    if (milliseconds < 0) return this.plusMilliseconds(Math.abs(milliseconds));

    let secondsToMinus = Math.trunc(milliseconds / 1000);
    /**
     * @type {number}
     */
    let millisecondsPart = milliseconds % 1000;
    millisecondsPart = this.milliseconds() - millisecondsPart
    if (millisecondsPart < 0) {
      millisecondsPart = 1000 + millisecondsPart;
      secondsToMinus++;
    }

    /**
     * @type {FlexTimeExtended}
     */
    const ret = FlexTimeExtended.fromFlexTime(
      new FlexTime(`${this.hours().toString().padStart(2, '0')}:${this.minutes().toString().padStart(2, '0')}:${this.seconds().toString().padStart(2, '0')}${this.#formatMilliseconds(millisecondsPart)}`)
    );

    if (secondsToMinus === 0) return ret;
    return ret.minusSeconds(secondsToMinus);
  }

  /**
   * @param {FlexTimeExtended} time
   * @return {boolean}
   */
  isBefore(time) {
    return this.#getTimeParts().isBefore(TimeParts.fromFlexTime(time));
  }

  /**
   * @param {FlexTimeExtended} time
   * @return {boolean}
   */
  isAfter(time) {
    return this.#getTimeParts().isAfter(TimeParts.fromFlexTime(time));
  }

  /**
   * @param {FlexTimeExtended} time
   * @return {boolean}
   */
  isEquals(time) {
    return this.#getTimeParts().isEquals(TimeParts.fromFlexTime(time));
  }

  /**
   * @return {string}
   */
  toISO() {
    return this.#time.toJSON()
  }

  /**
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   * @return {FlexTime}
   */
  toFlexTime() {
    return this.#time
  }

  /**
   * @return {string}
   */
  toString() {
    return this.#time.toString()
  }

  /**
   * @param {string} format
   * @param {string} locale
   * @return {string}
   */
  format(format, locale) {
    return TimeFormatter.format(this, format, locale)
  }
}

class TimeParts {

  /**
   * @type {number}
   */
  #hours
  /**
   * @type {number}
   */
  #minutes
  /**
   * @type {number}
   */
  #seconds
  /**
   * @type {number}
   */
  #milliseconds
  /**
   * @type {number}
   */
  #nanoseconds

  /**
   * @private
   * @param {number} hours
   * @param {number} minutes
   * @param {number} seconds
   * @param {number} milliseconds
   * @param {number} nanoseconds
   */
  constructor(hours, minutes, seconds, milliseconds, nanoseconds) {
    this.#hours = hours;
    this.#minutes = minutes;
    this.#seconds = seconds;
    this.#milliseconds = milliseconds;
    this.#nanoseconds = nanoseconds;
  }

  /**
   * @param {FlexTime} time
   * @return {TimeParts}
   */
  static fromFlexTime(time) {
    /**
     * @type {RegExpMatchArray}
     */
    const matches = time.toString().match(FlexTime.PATTERN);
    const hours = parseInt(matches?.[1] ?? 0);
    const minutes = parseInt(matches?.[2] ?? 0);
    const seconds = parseInt(matches?.[3] ?? 0);

    const millisecondsString = matches?.[5] ?? null;

    let milliseconds = 0;
    let nanoseconds = 0;
    if (!isNull(millisecondsString)) {
      if (millisecondsString.length > 3) {
        milliseconds = parseInt(millisecondsString.substring(0, 3));
        nanoseconds = parseInt(millisecondsString.substring(3));
      } else {
        milliseconds = parseInt(millisecondsString.padEnd(3, '0'));
      }
    }

    return new TimeParts(hours, minutes, seconds, milliseconds, nanoseconds);
  }


  /**
   * @return {number}
   */
  hours() {
    return this.#hours;
  }

  /**
   * @return {number}
   */
  minutes() {
    return this.#minutes;
  }

  /**
   * @return {number}
   */
  seconds() {
    return this.#seconds;
  }

  /**
   * @return {number}
   */
  milliseconds() {
    return this.#milliseconds;
  }

  /**
   * @return {number}
   */
  nanoseconds() {
    return this.#nanoseconds;
  }

  /**
   * @param {TimeParts} time
   * @return {boolean}
   */
  isBefore(time) {
    if (this.#hours < time.hours()) return true;
    if (this.#minutes < time.minutes()) return true;
    if (this.#seconds < time.seconds()) return true;
    if (this.#milliseconds < time.milliseconds()) return true;
    if (this.#nanoseconds < time.nanoseconds()) return true;
    return false;
  }

  /**
   * @param {TimeParts} time
   * @return {boolean}
   */
  isAfter(time) {
    if (this.#hours > time.hours()) return true;
    if (this.#minutes > time.minutes()) return true;
    if (this.#seconds > time.seconds()) return true;
    if (this.#milliseconds > time.milliseconds()) return true;
    if (this.#nanoseconds > time.nanoseconds()) return true;
    return false;
  }

  /**
   * @param {TimeParts} time
   * @return {boolean}
   */
  isEquals(time) {
    if (this.#hours !== time.hours()) return false;
    if (this.#minutes !== time.minutes()) return false;
    if (this.#seconds !== time.seconds()) return false;
    if (this.#milliseconds !== time.milliseconds()) return false;
    if (this.#nanoseconds !== time.nanoseconds()) return false;
    return true;
  }
}
