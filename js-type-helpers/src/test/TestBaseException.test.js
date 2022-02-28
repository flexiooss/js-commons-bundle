import {TestCase} from '@flexio-oss/code-altimeter-js'
import {BaseException} from "../js/BaseException";

const assert = require('assert')

class MyException extends BaseException {
  realName() {
    return 'MyException'
  }
}

export class TestBaseException extends TestCase {
  debug = true

  testToString() {

    this.log(new MyException('test', 12).toString())
    this.log(JSON.stringify(new MyException('test', 12)))

    try {
      throw new MyException('test', 12)
    } catch (e) {
      this.log(e)
    }
  }
}

runTest(TestBaseException)
