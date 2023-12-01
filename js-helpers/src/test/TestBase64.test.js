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

  }

}

runTest(TestBase64Test)
