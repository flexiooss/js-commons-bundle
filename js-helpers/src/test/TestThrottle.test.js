import {TestCase} from '@flexio-oss/code-altimeter-js'
import {Base64} from '../js/Base64.js'
import {Throttle} from "../js/Throttle.js";

const assert = require('assert')

export class TestThrottle extends TestCase {
  debug = true

  timeOut = 1000

  async asyncTestInvokeAndEnsure() {
    const throttle = new Throttle(300)
    let RES = 0
    let EXEC = 0

    throttle.invokeAndEnsure(() => {
      this.log(1)
      EXEC++
      RES = 1
    })
    throttle.invokeAndEnsure(() => {
      this.log(2)
      EXEC++
      RES = 2
    })
    throttle.invokeAndEnsure(() => {
      this.log(3)
      EXEC++
      RES = 3
    })
    throttle.invokeAndEnsure(() => {
      this.log(4)
      EXEC++
      RES = 4
    })
    throttle.invokeAndEnsure(() => {
      this.log(5)
      EXEC++
      RES = 5
    })

    this.log(RES, 'RES')
    this.log(EXEC, 'EXEC')

    return new Promise(ok => {
      setTimeout(() => {
        assert.equal(RES , 5)
        assert.equal(EXEC , 2)
        this.log(RES, 'RES 1000')
        this.log(EXEC, 'EXEC 1000')
        ok()
      }, this.timeOut)
    })
  }


  async asyncTestInvokeAndEnsureAsync() {
    const throttle = new Throttle(300)
    let RES = 0
    let EXEC = 0

    Promise.resolve().then(() => {
      throttle.invokeAndEnsure(() => {
        this.log(1,'Async')
        EXEC++
        RES = 1
      })
    })
    Promise.resolve().then(() => {
      throttle.invokeAndEnsure(() => {
        this.log(2,'Async')
        EXEC++
        RES = 2
      })
    })
    Promise.resolve().then(() => {
      throttle.invokeAndEnsure(() => {
        this.log(3,'Async')
        EXEC++
        RES = 3
      })
    })
    Promise.resolve().then(() => {
      throttle.invokeAndEnsure(() => {
        this.log(4,'Async')
        EXEC++
        RES = 4
      })
    })
    Promise.resolve().then(() => {
      throttle.invokeAndEnsure(() => {
        this.log(5,'Async')
        EXEC++
        RES = 5
      })
    })

    this.log(RES, 'Async RES')
    this.log(EXEC, 'Async EXEC')

    return new Promise(ok => {
      setTimeout(() => {
        assert.equal(RES , 5)
        assert.equal(EXEC , 2)
        this.log(RES, 'Async RES 1000')
        this.log(EXEC, 'Async EXEC 1000')
        ok()
      }, this.timeOut)
    })
  }


  async asyncTestInvokeAndEnsureBig() {
    const throttle = new Throttle(300)
    let RES = 0
    let EXEC = 0

    for (let i = 1; i < 1000; i++) {
      throttle.invokeAndEnsure(() => {
        this.log(i,'Big')
        EXEC++
        RES = i
      })
    }

    this.log(RES, 'Big RES')
    this.log(EXEC, 'Big EXEC')

    return new Promise(ok => {
      setTimeout(() => {
        assert.equal(RES, 999)
        assert.equal(EXEC , 2)
        this.log(RES, 'Big RES 1000')
        this.log(EXEC, 'Big EXEC 1000')
        ok()
      }, this.timeOut)
    })
  }

  async asyncTestInvokeAndEnsureBigAsync() {
    const throttle = new Throttle(300)
    let RES = 0
    let EXEC = 0

    for (let i = 1; i < 1000; i++) {
      Promise.resolve().then(() => {
        throttle.invokeAndEnsure(() => {
          this.log(i,'BigAsync')
          EXEC++
          RES = i
        })
      })
    }

    this.log(RES, 'BigAsync RES')
    this.log(EXEC, 'BigAsync EXEC')

    return new Promise(ok => {
      setTimeout(() => {
        assert.equal(RES , 999)
        assert.equal(EXEC , 2)
        this.log(RES, 'BigAsync RES 1000')
        this.log(EXEC, 'BigAsync EXEC 1000')
        ok()
      }, this.timeOut)
    })
  }

}

runTest(TestThrottle)
