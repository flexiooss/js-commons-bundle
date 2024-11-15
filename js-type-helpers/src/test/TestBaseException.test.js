import {TestCase} from '@flexio-oss/code-altimeter-js'
import {BaseException} from "../js/BaseException.js";

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

  testCause() {
    const error1 = new MyException('1', 12)
    const error2 = new MyException('1', 12, error1)
    this.log(error2.toString())
    this.log(JSON.stringify(error2))

    try {
      throw error2
    } catch (e) {
      this.log(e)
    }
  }
}

runTest(TestBaseException)
