/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {URLExtendedBuilder, URLExtended} from '../js/URLExtended.js'

const assert = require('assert')

export class TestURLExtendedTest extends TestCase {
  debug = true

  testEncodeUrl() {
    const a = new URLExtended('https://monsite.com/truc?bibi=tagada')
    assert.strictEqual(JSON.stringify(a), '{"href":"https://monsite.com/truc?bibi=tagada"}')
  }

  testEncodeDecodeMap() {
    const a = new URLExtended('https://monsite.com/truc?bibi=tagada')
    const sa = JSON.stringify(a)
    const b = URLExtendedBuilder.fromJson(sa).build()

    assert.deepEqual(a, b)
  }
}

runTest(TestURLExtendedTest)
