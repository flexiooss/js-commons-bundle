/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {DateFormatter, DateTimeFormatter, TimeFormatter} from '../js/date-formatter/DateFormatter.js'
import {FlexDateTimeExtended} from '../js/FlexDateTimeExtended.js'
import {FlexDateExtended} from '../js/FlexDateExtended.js'
import {FlexTimeExtended} from '../js/FlexTimeExtended.js'

const assert = require('assert')

export class TestFormatedDateTest extends TestCase {
  setUp() {
    this.datetime = FlexDateTimeExtended.fromISO('2021-03-15T12:24:07.456')
    this.datetimeBorder = FlexDateTimeExtended.fromISO('2020-12-31T23:50:33.456')
    this.date1 = FlexDateExtended.fromISO('2020-01-01')
    this.date = FlexDateExtended.fromISO('2020-12-31')
    this.time = FlexTimeExtended.fromISO('23:50:33.456')
  }

  testDateTimeYear() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyyy', 'fr'), '2021')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy', 'fr'), '2020')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy', 'fr', 'Europe/Paris'), '2021')
  }

  testDateTimeMonth() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'MM', 'fr'), '03')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'MM', 'fr'), '12')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'MM', 'fr', 'Europe/Paris'), '01')
  }

  testDateTimeDay() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd', 'fr',), '15')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd', 'fr'), '31')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd', 'fr', 'Europe/Paris'), '01')
  }

  testDateTimeHour() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'HH', 'fr'), '12')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH', 'fr'), '23')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH', 'fr', 'Europe/Paris'), '00')
  }

  testDateTimeMinute() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'mm', 'fr'), '24')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'mm', 'fr'), '50')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'mm', 'fr', 'Europe/Paris'), '50')
  }

  testDateTimeSecond() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ss', 'fr'), '07')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'ss', 'fr'), '33')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'ss', 'fr', 'Europe/Paris'), '33')
  }

  testDateTimeWeek() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'w', 'fr'), '11')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'w', 'fr'), '53')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'w', 'fr', 'Europe/Paris'), '53')
  }

  testDateTimeTime() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'HH:mm', 'fr'), '12:24')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH:mm', 'fr'), '23:50')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH:mm', 'fr', 'Europe/Paris'), '00:50')
  }

  testDateTimeTimeWithSeconds() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'HH:mm:ss', 'fr'), '12:24:07')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH:mm:ss', 'fr'), '23:50:33')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH:mm:ss', 'fr', 'Europe/Paris'), '00:50:33')
  }

  testDateTimeTimeWithMillis() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'HH:mm:ss.SSS', 'fr'), '12:24:07.456')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH:mm:ss.SSS', 'fr'), '23:50:33.456')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'HH:mm:ss.SSS', 'fr', 'Europe/Paris'), '00:50:33.456')
  }

  testDateTimeDateWithSpace() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd MM yy', 'fr'), '15 03 21')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd MM yy', 'fr'), '31 12 20')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd MM yy', 'fr', 'Europe/Paris'), '01 01 21')
  }

  testDateTimeBorder() {
    assert.strictEqual(DateTimeFormatter.format(FlexDateTimeExtended.fromISO('2020-12-31T23:00:00'), 'dd MM yy', 'fr', 'Europe/Paris'), '01 01 21')
    assert.strictEqual(DateTimeFormatter.format(FlexDateTimeExtended.fromISO('2020-12-31T23:00:00'), 'dd/MM/yyyy', 'fr', 'Europe/Paris'), '01/01/2021')
  }

  testDateTimeDateFrench() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd/MM/yyyy', 'fr'), '15/03/2021')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy', 'fr'), '31/12/2020')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy', 'fr', 'Europe/Paris'), '01/01/2021')
  }

  testDateTimeDateUS() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'MM/dd/yyyy', 'fr'), '03/15/2021')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'MM/dd/yyyy', 'fr'), '12/31/2020')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'MM/dd/yyyy', 'fr', 'Europe/Paris'), '01/01/2021')
  }

  testDateTimeDateTimeDataBase() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyyy-MM-dd HH:mm:ss', 'fr'), '2021-03-15 12:24:07')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-dd HH:mm:ss', 'fr'), '2020-12-31 23:50:33')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-dd HH:mm:ss', 'fr', 'Europe/Paris'), '2021-01-01 00:50:33')
  }

  testDateTimeDateTimeDataBaseWithMillis() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyyy-MM-dd HH:mm:ss.SSS', 'fr'), '2021-03-15 12:24:07.456')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-dd HH:mm:ss.SSS', 'fr'), '2020-12-31 23:50:33.456')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-dd HH:mm:ss.SSS', 'fr', 'Europe/Paris'), '2021-01-01 00:50:33.456')
  }

  testDateTime() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd/MM/yyyy HH:mm:ss', 'fr'), '15/03/2021 12:24:07')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy HH:mm:ss', 'fr'), '31/12/2020 23:50:33')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy HH:mm:ss', 'fr', 'Europe/Paris'), '01/01/2021 00:50:33')
  }

  testDateTimeWithMillis() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd/MM/yyyy HH:mm:ss.SSS', 'fr'), '15/03/2021 12:24:07.456')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy HH:mm:ss.SSS', 'fr'), '31/12/2020 23:50:33.456')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy HH:mm:ss.SSS', 'fr', 'Europe/Paris'), '01/01/2021 00:50:33.456')
  }

  testDateTimeISO() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyyy-MM-ddTHH:mm:ssZ', 'fr', 'Europe/Paris'), '2021-03-15T12:24:07Z')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-ddTHH:mm:ssZ', 'fr', 'Europe/Paris'), '2020-12-31T23:50:33Z')
  }

  testDateTimeISOWithMillis() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'fr', 'Europe/Paris'), '2021-03-15T12:24:07.456Z')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'fr', 'Europe/Paris'), '2020-12-31T23:50:33.456Z')
  }

  testDateTimeJson() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'json', 'fr', 'Europe/Paris'), '/Date(1615811047456)/')
  }

  testDateYear() {
    assert.strictEqual(DateFormatter.format(this.date1, 'yyyy', 'fr'), '2020')
    assert.strictEqual(DateFormatter.format(this.date, 'yyyy', 'fr'), '2020')
  }

  testDateMonth() {
    assert.strictEqual(DateFormatter.format(this.date, 'MM', 'fr'), '12')
  }

  testDateDay() {
    assert.strictEqual(DateFormatter.format(this.date, 'dd', 'fr'), '31')
  }

  testDateWeek() {
    assert.strictEqual(DateFormatter.format(this.date, 'w', 'fr'), '53')
  }

  testDateWithSpace() {
    assert.strictEqual(DateFormatter.format(this.date, 'dd MM yy', 'fr'), '31 12 20')
  }

  testDateFrench() {
    assert.strictEqual(DateFormatter.format(this.date, 'dd/MM/yyyy', 'fr'), '31/12/2020')
  }


  testTimeHour() {
    assert.strictEqual(TimeFormatter.format(this.time, 'HH', 'fr'), '23')
  }

  testTimeMinute() {
    assert.strictEqual(TimeFormatter.format(this.time, 'mm', 'fr'), '50')
  }

  testTimeSecond() {
    assert.strictEqual(TimeFormatter.format(this.time, 'ss', 'fr'), '33')
  }

  testTime() {
    assert.strictEqual(TimeFormatter.format(this.time, 'HH:mm', 'fr'), '23:50')
  }

  testTimeWithSeconds() {
    assert.strictEqual(TimeFormatter.format(this.time, 'HH:mm:ss', 'fr'), '23:50:33')
  }

  testTimeWithMillis() {
    assert.strictEqual(TimeFormatter.format(this.time, 'HH:mm:ss.SSS', 'fr'), '23:50:33.456')
  }

  testCustomSymbol() {
    // https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html
    // symbol non compatible : 2021-03-15T12:24:07
    // u : year
    // D : day-of-year
    // Q : quarter-of-year
    // Y : week-based-year
    // W : week-of-month
    // E : day-of-week
    // e : localized day-of-week
    // F : week of month
    // a : am-pm-of-day
    // K : hour-of-am-pm (0-11)
    // k : clock-hour-of-am-pm (1-24)
    // A : milli-of-day
    // n : nano-of-second
    // N : nano-of-day
    // V : time-zone ID
    // O : localized zone-offset
    // X : zone-offset 'Z' for zero
    // x : zone-offset
    // p : pad next
    // '' : single quote
    // [ : optional section start
    // ] : optional section end
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'G', 'en'), 'AD')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'u', 'en'), '2021')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'y', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'D', 'en'), '74')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'M', 'en'), '3')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'L', 'en'), '3')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'd', 'en'), '15')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'Q', 'en'), '1')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'q', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'Y', 'en'), '2021')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'w', 'en'), '11')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'W', 'en'), '3')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'E', 'en'), 'Monday')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'e', 'en'), 'Monday')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'c', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'F', 'en'), '3')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'a', 'en'), 'PM')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'h', 'en'), '12')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'K', 'en'), '0')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'k', 'en'), '0')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'H', 'en'), '12')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'm', 'en'), '24')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 's', 'en'), '7')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'S', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'A', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'n', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'N', 'en'), '456')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'V', 'en'), 'UTC')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'z', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'O', 'en'), '+OO:OO')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'X', 'en'), '+0')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'x', 'en'), '+0')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'Z', 'en'), '+0')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'p', 'en'), '')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, '\'plok\'', 'en'), 'plok')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, "''", 'en'), "'")
  }

  testCustomPatternDate() {
    // https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatterBuilder.html : appendPattern
    // pattern non compatible : 2021-03-15T12:24:07.456
    // GGG, GGGG : era
    // u, uu, uuu, u..u : year
    // yyy, y..y : year
    // qqq, qqqq, qqqqq : quarter
    // ww : week padded
    // D, DD : day of year
    // EE : day of week text
    // e, ee, eee, eeee, eeeee : day of week
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'G', 'en'), 'AD')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'GG', 'en'), 'Anno Domini')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'GGG', 'en'), 'A')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'GGGG', 'en'), 'A')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'GGGGG', 'en'), 'A')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'u', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'uu', 'en'), '21')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'uuu', 'en'), '21')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'y', 'en'), '2021')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yy', 'en'), '21')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyy', 'en'), '2021')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'Q', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'QQ', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'QQQ', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'QQQQ', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'QQQQQ', 'en'), '2021')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'q', 'en'), '1')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'qq', 'en'), '01')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'qqq', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'qqqq', 'en'), '2021')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'qqqqq', 'en'), '2021')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'M', 'en'), '3')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'MM', 'en'), '03')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'MMM', 'en'), 'Mar')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'MMMM', 'en'), 'March')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'MMMMM', 'en'), 'M')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'L', 'en'), '3')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'LL', 'en'), '03')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'LLL', 'en'), 'Mar')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'LLLL', 'en'), 'March')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'LLLLL', 'en'), 'M')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'w', 'en'), '11')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ww', 'en'), '11')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'd', 'en'), '15')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd', 'en'), '15')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'D', 'en'), '74')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'DD', 'en'), '74')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'E', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'EE', 'en'), '1')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'EEE', 'en'), 'Mon')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'EEEE', 'en'), 'Monday')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'EEEEE', 'en'), 'M')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'e', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ee', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'eee', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'eeee', 'en'), '1')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'eeeee', 'en'), '1')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'c', 'en'), '1')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ccc', 'en'), 'Mon')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'cccc', 'en'), 'Monday')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ccccc', 'en'), 'M')
  }

  testCustomPatternTime() {
    // https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatterBuilder.html : appendPattern
    // pattern non compatible : 2021-03-15T12:24:07.456
    // A : MILLI DAY
    // n : nano of second
    // N : nano of day
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'a', 'en'), 'PM')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'h', 'en'), '12')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'hh', 'en'), '12')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'H', 'en'), '12')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'HH', 'en'), '12')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'k', 'en'), '12')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'kk', 'en'), '12')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'K', 'en'), '12')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'KK', 'en'), '12')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'm', 'en'), '24')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'mm', 'en'), '24')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 's', 'en'), '7')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ss', 'en'), '07')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'S', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'SS', 'en'), '456')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'SSS', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'SSSS', 'en'), '456')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'A', 'en'), '456')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'n', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'nn', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'nnn', 'en'), '456')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'N', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'NN', 'en'), '456')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'NNN', 'en'), '456')
  }

  testCustomPatternZone() {
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'VV', 'en'), '456')
    // https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatterBuilder.html : appendPattern
    // pattern non compatible : 2021-03-15T12:24:07.456
    // VV : zone id
    // zz, zzz, zzzz : zone id
    // O, OOOO : zone offset
    // X, XX, XXX, XXXX, XXXXX : zone offset
    // x, xx, xxx, xxxx, xxxxx : zone offset

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'VV', 'en'), '')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'z', 'en'), 'UTC')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'z', 'en', 'Australia/Sydney'), 'Australia/Sydney')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'zz', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'zzz', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'zzzz', 'en'), 'UTC')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'O', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'OOOO', 'en'), 'UTC')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'X', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'XX', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'XXX', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'XXXX', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'XXXXX', 'en'), 'UTC')

    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'x', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'xx', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'xxx', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'xxxx', 'en'), 'UTC')
    // assert.strictEqual(DateTimeFormatter.format(this.datetime, 'xxxxx', 'en'), 'UTC')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'Z', 'en'), '+0')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZ', 'en'), '+00:00')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZZ', 'en'), '+0000')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZZZ', 'en'), 'UTC')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZZZZ', 'en'), 'UTC')

    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'Z', 'en', 'Australia/Sydney'), '+11')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZ', 'en', 'Australia/Sydney'), '+11:00')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZZ', 'en', 'Australia/Sydney'), '+1100')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZZZ', 'en', 'Australia/Sydney'), 'GMT+11')
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'ZZZZZ', 'en', 'Australia/Sydney'), 'Australian Eastern Daylight Time')
  }
}

runTest(TestFormatedDateTest)
