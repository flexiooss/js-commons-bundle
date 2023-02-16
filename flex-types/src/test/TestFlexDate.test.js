/* global runTest */
import {FlexDate, FlexDateTime, FlexTime, FlexZonedDateTime} from '../../src/js/FlexDate.js'

import {TestCase} from '@flexio-oss/code-altimeter-js'


const assert = require('assert')


export class TestFlexDate extends TestCase {
  debug = true
  testDateCreation() {
    let date = new FlexDate('1992-10-17')
    assert.strictEqual(date.toJSON(), '1992-10-17', 'test date creation')
  }

  testDateSerialize() {
    let date = new FlexDate('1992-10-17')
    assert.strictEqual(JSON.parse(JSON.stringify(date)), '1992-10-17', 'FlexDate serialize')

    let time = new FlexTime('04:17:32.527')
    assert.strictEqual(JSON.parse(JSON.stringify(time)), '04:17:32.527', 'FlexTime serialize')

    let flexDateTime = new FlexDateTime('1992-12-17T04:17:32')
    assert.strictEqual(JSON.parse(JSON.stringify(flexDateTime)), '1992-12-17T04:17:32', 'FlexDateTime serialize')

    let flexZonedDateTime = new FlexZonedDateTime('1992-10-17T04:17:32+03:00')
    assert.strictEqual(JSON.parse(JSON.stringify(flexZonedDateTime)), '1992-10-17T04:17:32+03:00', 'FlexZonedDateTime serialize')
  }

  testTimeCreation() {
    let time = new FlexTime('04:17:32.527')
    assert.strictEqual(time.toJSON(), '04:17:32.527', 'test time creation')

    time = new FlexTime('04:17:32.527Z')
    assert.strictEqual(time.toJSON(), '04:17:32.527', 'test time creation')

    time = new FlexTime('04:17:32')
    assert.strictEqual(time.toJSON(), '04:17:32', 'test time creation')

    time = new FlexTime('04:17:32Z')
    assert.strictEqual(time.toJSON(), '04:17:32', 'test time creation')

    time = new FlexTime('04:17:32Z')
    assert.strictEqual(time.toJSON(), '04:17:32', 'test time creation')
  }

  testDateTimeCreation() {
    let time = new FlexDateTime('1992-12-17T04:17:32')
    assert.strictEqual(time.toJSON(), '1992-12-17T04:17:32', 'test datetime creation')

    assert.throws(() => {
      new FlexDateTime('1992-10-17T04:17:32Z')
    })

    time = new FlexDateTime('1992-10-17T04:17:32.174')
    assert.strictEqual(time.toJSON(), '1992-10-17T04:17:32.174', 'test datetime creation')

    time = new FlexDateTime('1992-10-17T04:17:32.123456789')
    assert.strictEqual(time.toJSON(), '1992-10-17T04:17:32.123456789', 'test datetime creation with nanos')
    assert.throws(() => {
      new FlexDateTime('1992-10-17T04:17:32.174Z')
    })

  }

  testTzDateTimeCreation() {

    assert.throws(() => {
      new FlexZonedDateTime('1992-10-17T04:17:32Z+03:00')
    })

    let time = new FlexZonedDateTime('1992-10-17T04:17:32+03:00')
    assert.strictEqual(time.toJSON(), '1992-10-17T04:17:32+03:00', 'test tz datetime creation')

    assert.throws(() => {
      new FlexZonedDateTime('1992-10-17T04:17:32')
    })

    time = new FlexZonedDateTime('1992-10-17T04:17:32Z')
    assert.strictEqual(time.toJSON(), '1992-10-17T04:17:32Z', 'test tz datetime creation')
  }
}


runTest(TestFlexDate)
