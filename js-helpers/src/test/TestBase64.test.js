import {TestCase} from '@flexio-oss/code-altimeter-js'
import {Base64} from '../js/Base64.js'

const assert = require('assert')

export class TestBase64Test extends TestCase {
  debug = true

  testEncode() {
    assert.equal(
      Base64.encode('coucou'),
      'Y291Y291',
      'should be encoded')

    assert.equal(
      Base64.encode('[Congés payés 😎 ]'),
      'W0NvbmfDqXMgcGF5w6lzIPCfmI4gXQ==',
      'should be encoded utf8')


    const EXPECTED_2 = JSON.stringify({
      prop: ['janvier', 'décembre', 'août', 'éq@à', 'toto', '`coucou', '\'coucou']
    })

    assert.equal(
      Base64.decode(Base64.encode(EXPECTED_2)),
      EXPECTED_2,
      'should be encoded & decoded'
    )

  }


}

runTest(TestBase64Test)
