/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {DateFormatter, DateTimeFormatter, TimeFormatter} from '../js/date-formatter/DateFormatter'
import {FlexDate, FlexDateTime, FlexTime} from '../../../flex-types'

const assert = require('assert')

export class TestDateExtendedTest extends TestCase {
  setUp() {
    this.datetime = new FlexDateTime('2021-03-15T12:24:07')
    this.datetimeBorder = new FlexDateTime('2020-12-31T23:50:33')
    this.date = new FlexDate('2020-12-31')
    this.time = new FlexTime('23:50:33')
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
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd', 'fr', ), '15')
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

  testDateTimeDateWithSpace() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd MM yy', 'fr'), '15 03 21')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd MM yy', 'fr'), '31 12 20')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd MM yy', 'fr', 'Europe/Paris'), '01 01 21')
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

  testDateTime() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'dd/MM/yyyy HH:mm:ss', 'fr'), '15/03/2021 12:24:07')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy HH:mm:ss', 'fr'), '31/12/2020 23:50:33')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'dd/MM/yyyy HH:mm:ss', 'fr', 'Europe/Paris'), '01/01/2021 00:50:33')
  }

  testDateTimeISO() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'yyyy-MM-ddTHH:mm:ssZ', 'fr', 'Europe/Paris'), '2021-03-15T12:24:07Z')
    assert.strictEqual(DateTimeFormatter.format(this.datetimeBorder, 'yyyy-MM-ddTHH:mm:ssZ', 'fr', 'Europe/Paris'), '2020-12-31T23:50:33Z')
  }

  testDateTimeJson() {
    assert.strictEqual(DateTimeFormatter.format(this.datetime, 'json', 'fr', 'Europe/Paris'), '\\Date(1615811047000)')
  }



  testDateYear() {
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
}

runTest(TestDateExtendedTest)
