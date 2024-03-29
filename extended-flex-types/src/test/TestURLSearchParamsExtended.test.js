/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {URLSearchParamsExtended, URLSearchParamsExtendedBuilder} from '../js/URLSearchParamsExtended.js'

const assert = require('assert')

export class TestURLSearchParamsExtendedTest extends TestCase {
  testEncodeUrl() {
    const a = new URLSearchParamsExtended('bibi=tagada&bou=tugudu')
    assert.strictEqual(JSON.stringify(a), '{"query":"bibi=tagada&bou=tugudu"}')
  }

  testEncodeDecodeMap() {
    const a = new URLSearchParamsExtended('bibi=tagada&bou=tugudu')
    const sa = JSON.stringify(a)
    const b = URLSearchParamsExtendedBuilder.fromJson(sa).build()

    assert.deepEqual(a, b)
  }
}

runTest(TestURLSearchParamsExtendedTest)
