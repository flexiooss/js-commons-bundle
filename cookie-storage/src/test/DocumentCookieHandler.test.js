/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {DocumentCookieHandler} from '../js/cookie/DocumentCookieHandler'
import {CookieStorageConfig} from '../js/CookieStorageConfig'
import {CookieConfig} from '../js/cookie/CookieConfig'
import {isNull} from '../js/__import__assert'

const assert = require('assert')

if (typeof window.atob === 'undefined') {
  global.atob = (str) => {
    return Buffer.from(str, 'base64').toString()
  }
}

if (typeof window.btoa === 'undefined') {
  global.btoa = (str) => {
    return Buffer.from(str).toString('base64')
  }
}

class FakeDocument {
  constructor() {
    /**
     * @type {Map<string, string>}
     * @private
     */
    this.__cookies = new Map()
  }

  /**
   * @return {string}
   * @constructor
   */
  static CONTENT_SUFFIX() {
    return '__CONTENT'
  }

  /**
   * @return {string}
   */
  get cookie() {
    const ret = []
    this.__cookies.forEach((v, k) => {
      if (k.endsWith(FakeDocument.CONTENT_SUFFIX())) {
        if (!isNull(v) && v !== '') {
          ret.push(k.replace(FakeDocument.CONTENT_SUFFIX(), '') + '=' + v)
        }
      }
    })
    return ret.join('; ')
  }

  /**
   * @param {string} value
   */
  set cookie(value) {
    const chunks = value.split(';')
    const contentChunck = chunks[0].split('=')
    const key = contentChunck[0]
    const content = contentChunck[1]
    this.__cookies.set(key, value)
    this.__cookies.set(key + FakeDocument.CONTENT_SUFFIX(), content)
  }

  /**
   * @param {string} key
   * @return {string}
   */
  fullCookie(key) {
    return this.__cookies.get(key)
  }
}

export class DocumentCookieHandlerTest extends TestCase {
  /**
   * @param {{cookie:string}} document
   * @param {string} [namespace=null]
   */
  setUpHandler(document, namespace = null) {
    this.cookieHandler = new DocumentCookieHandler(
      new CookieStorageConfig(
        document,
        namespace,
        '__SIZE__',
        '__',
        '--',
        50,
        new CookieConfig(null, 12)
      )
    )
  }


  testSimpleWriteWithDate() {
    const document = new FakeDocument()
    this.cookieHandler = new DocumentCookieHandler(
      new CookieStorageConfig(
        document,
        null,
        '__SIZE__',
        '__',
        '--',
        50,
        new CookieConfig(new Date(Date.UTC(96, 1, 2, 3, 4, 5)))
      )
    )
    this.cookieHandler
      .write('toto', 'blabla')

    assert.equal(document.cookie, 'toto__SIZE__=1; toto__0=YmxhYmxh',
      'testSimpleWrite: cookie content should be write')

    assert.equal(document.fullCookie('toto' + '__0'), 'toto__0=YmxhYmxh;path=/;expires=Fri, 02 Feb 1996 03:04:05 GMT;secure;samesite=strict',
      'testSimpleWrite: full cookie should be write')

    assert.equal(document.fullCookie('toto' + '__SIZE__'), 'toto__SIZE__=1;path=/;expires=Fri, 02 Feb 1996 03:04:05 GMT;secure;samesite=strict',
      'testSimpleWrite: cookie Size should be write')
  }

  testSimpleWrite() {
    const document = new FakeDocument()
    this.setUpHandler(document)
    this.cookieHandler
      .write('toto', 'blabla')

    assert.equal(document.cookie, 'toto__SIZE__=1; toto__0=YmxhYmxh',
      'testSimpleWrite: cookie content should be write')

    assert.equal(document.fullCookie('toto' + '__0'), 'toto__0=YmxhYmxh;path=/;max-age=12;secure;samesite=strict',
      'testSimpleWrite: full cookie should be write')

    assert.equal(document.fullCookie('toto' + '__SIZE__'), 'toto__SIZE__=1;path=/;max-age=12;secure;samesite=strict',
      'testSimpleWrite: cookie Size should be write')
  }

  testSimpleWriteWithNamespace() {
    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')
    this.cookieHandler
      .write('toto', 'blabla')

    assert.equal(document.cookie, 'myNamespace--toto__SIZE__=1; myNamespace--toto__0=YmxhYmxh',
      'testSimpleWriteWithNamespace: cookie content should be write')

    assert.equal(document.fullCookie('myNamespace--' + 'toto' + '__0'), 'myNamespace--toto__0=YmxhYmxh;path=/;max-age=12;secure;samesite=strict',
      'testSimpleWriteWithNamespace: full cookie should be write')

    assert.equal(document.fullCookie('myNamespace--' + 'toto' + '__SIZE__'), 'myNamespace--toto__SIZE__=1;path=/;max-age=12;secure;samesite=strict',
      'testSimpleWriteWithNamespace: cookie Size should be write')

  }


  testBigWrite() {
    const document = new FakeDocument()
    this.setUpHandler(document)
    this.cookieHandler
      .write('toto', 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf')

    assert.equal(document.cookie, 'toto__SIZE__=4; toto__0=YmxhYiBsYSBxc2RvZmogcXNkZm9pc3FkIGZxc2RmIDU0IDVzcW; toto__1=Rmc2RxNWYgc2RxZjU0c2Q2IGY1NHNkNjVmIHNxZDY1ZjQgNjVz; toto__2=ZDQgZjY1c3FkZjYgNGRxczY1ZjRkcXM2IDVxc2Q2NWYgc2Q2My; toto__3=BmNDZzcWQ1ZjRxc2Rm',
      'testBigWrite: cookie content should be write')

    assert.equal(document.fullCookie('toto' + '__SIZE__'), 'toto__SIZE__=4;path=/;max-age=12;secure;samesite=strict',
      'testBigWrite: cookie Size should be write')
  }

  testBigWriteWithNamespace() {
    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')
    this.cookieHandler
      .write('toto', 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf')

    assert.equal(document.cookie, 'myNamespace--toto__SIZE__=4; myNamespace--toto__0=YmxhYiBsYSBxc2RvZmogcXNkZm9pc3FkIGZxc2RmIDU0IDVzcW; myNamespace--toto__1=Rmc2RxNWYgc2RxZjU0c2Q2IGY1NHNkNjVmIHNxZDY1ZjQgNjVz; myNamespace--toto__2=ZDQgZjY1c3FkZjYgNGRxczY1ZjRkcXM2IDVxc2Q2NWYgc2Q2My; myNamespace--toto__3=BmNDZzcWQ1ZjRxc2Rm',
      'testBigWriteWithNamespace: cookie content should be write')

    assert.equal(document.fullCookie('myNamespace--' + 'toto' + '__SIZE__'), 'myNamespace--toto__SIZE__=4;path=/;max-age=12;secure;samesite=strict',
      'testBigWriteWithNamespace: cookie Size should be write')

  }

  testRetrieve() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'
    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')
    this.cookieHandler
      .write('toto', content)

    assert.equal(this.cookieHandler.value('toto'), content,
      'testRetrieve: handler should retrieve full content')
  }

  testReplace() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'
    const content2 = 'BLAB la qsdofj qsdfoisqd '

    const document = new FakeDocument()
    this.setUpHandler(document)

    this.cookieHandler
      .write('toto', content)

    this.cookieHandler
      .write('toto', content2)

    assert.equal(this.cookieHandler.value('toto'), content2,
      'testReplace: handler should retrieve full content')
    assert.equal(document.cookie, 'toto__SIZE__=1; toto__0=QkxBQiBsYSBxc2RvZmogcXNkZm9pc3FkIA',
      'testReplace: cookie content should be write')

    assert.equal(document.fullCookie('toto' + '__SIZE__'), 'toto__SIZE__=1;path=/;max-age=12;secure;samesite=strict',
      'testReplace: cookie Size should be write')
  }

  testReplaceWithNamespace() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'
    const content2 = 'BLAB la qsdofj qsdfoisqd '

    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')

    this.cookieHandler
      .write('toto', content)

    this.cookieHandler
      .write('toto', content2)

    assert.equal(this.cookieHandler.value('toto'), content2,
      'testReplaceWithNamespace: handler should retrieve full content')
    assert.equal(document.cookie, 'myNamespace--toto__SIZE__=1; myNamespace--toto__0=QkxBQiBsYSBxc2RvZmogcXNkZm9pc3FkIA',
      'testReplaceWithNamespace: cookie content should be write')

    assert.equal(document.fullCookie('myNamespace--' + 'toto' + '__SIZE__'), 'myNamespace--toto__SIZE__=1;path=/;max-age=12;secure;samesite=strict',
      'testReplaceWithNamespace: cookie Size should be write')

  }

  testClean() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'

    const document = new FakeDocument()
    this.setUpHandler(document)

    this.cookieHandler
      .write('toto', content)

    assert.throws(() => {
        this.cookieHandler.cleanByNamespace()
      },
      /^Error: Cookie namespace can not be cleared : namespace is Null$/
    )

    assert.equal(document.cookie, 'toto__SIZE__=4; toto__0=YmxhYiBsYSBxc2RvZmogcXNkZm9pc3FkIGZxc2RmIDU0IDVzcW; toto__1=Rmc2RxNWYgc2RxZjU0c2Q2IGY1NHNkNjVmIHNxZDY1ZjQgNjVz; toto__2=ZDQgZjY1c3FkZjYgNGRxczY1ZjRkcXM2IDVxc2Q2NWYgc2Q2My; toto__3=BmNDZzcWQ1ZjRxc2Rm',
      'testClean: nothing should be removed')

    assert.equal(document.fullCookie('toto' + '__SIZE__'), 'toto__SIZE__=4;path=/;max-age=12;secure;samesite=strict',
      'testClean: nothing should be removed')
  }

  testCleanWithNamespace() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'

    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')

    this.cookieHandler
      .write('toto', content)

    this.cookieHandler.cleanByNamespace()

    assert.equal(this.cookieHandler.value('toto'), null,
      'testCleanWithNamespace: handler should retrieve none content')
    assert.equal(document.cookie, '',
      'testCleanWithNamespace: cookie content should be empty')
    assert.equal(document.fullCookie('myNamespace--' + 'toto' + '__SIZE__'), 'myNamespace--toto__SIZE__=; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'testCleanWithNamespace: cookie Size should be removed')
  }

  testRemove() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'

    const document = new FakeDocument()
    this.setUpHandler(document)

    this.cookieHandler
      .write('toto', content)
    this.cookieHandler
      .write('tutu', content)

    this.cookieHandler.remove('toto')

    assert.equal(this.cookieHandler.value('toto'), null,
      'testRemove: handler should retrieve none content')
    assert.equal(this.cookieHandler.value('tutu'), content,
      'testRemove: handler should retrieve full content')

    assert.equal(document.cookie, 'tutu__SIZE__=4; tutu__0=YmxhYiBsYSBxc2RvZmogcXNkZm9pc3FkIGZxc2RmIDU0IDVzcW; tutu__1=Rmc2RxNWYgc2RxZjU0c2Q2IGY1NHNkNjVmIHNxZDY1ZjQgNjVz; tutu__2=ZDQgZjY1c3FkZjYgNGRxczY1ZjRkcXM2IDVxc2Q2NWYgc2Q2My; tutu__3=BmNDZzcWQ1ZjRxc2Rm',
      'testRemove: cookie content should be cleaned')

    assert.equal(document.fullCookie('toto' + '__SIZE__'), 'toto__SIZE__=; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'testRemove: cookie Size should be removed')
  }

  testRemoveWithNamespace() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'

    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')

    this.cookieHandler
      .write('toto', content)
    this.cookieHandler
      .write('tutu', content)

    this.cookieHandler.remove('toto')

    assert.equal(this.cookieHandler.value('toto'), null,
      'testRemoveWithNamespace: handler should retrieve none content')
    assert.equal(this.cookieHandler.value('tutu'), content,
      'testRemoveWithNamespace: handler should retrieve full content')

    assert.equal(document.cookie, 'myNamespace--tutu__SIZE__=4; myNamespace--tutu__0=YmxhYiBsYSBxc2RvZmogcXNkZm9pc3FkIGZxc2RmIDU0IDVzcW; myNamespace--tutu__1=Rmc2RxNWYgc2RxZjU0c2Q2IGY1NHNkNjVmIHNxZDY1ZjQgNjVz; myNamespace--tutu__2=ZDQgZjY1c3FkZjYgNGRxczY1ZjRkcXM2IDVxc2Q2NWYgc2Q2My; myNamespace--tutu__3=BmNDZzcWQ1ZjRxc2Rm',
      'testRemove: cookie content should be cleaned')

    assert.equal(document.fullCookie('myNamespace--' + 'toto' + '__SIZE__'), 'myNamespace--toto__SIZE__=; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'testRemoveWithNamespace: cookie Size should be removed')
  }

  testHas() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'

    const document = new FakeDocument()
    this.setUpHandler(document)

    this.cookieHandler
      .write('toto', content)
    this.cookieHandler
      .write('tutu', content)

    assert.equal(this.cookieHandler.has('toto'), true,
      'testHas: should have toto')
    assert.equal(this.cookieHandler.has('tutu'), true,
      'testHas: should have tutu')
    assert.equal(this.cookieHandler.has('titi'), false,
      'testHas: should not have titi')
  }

  testHasWithNamespace() {
    const content = 'blab la qsdofj qsdfoisqd fqsdf 54 5sqdfsdq5f sdqf54sd6 f54sd65f sqd65f4 65sd4 f65sqdf6 4dqs65f4dqs6 5qsd65f sd63 f46sqd5f4qsdf'

    const document = new FakeDocument()
    this.setUpHandler(document, 'myNamespace')

    this.cookieHandler
      .write('toto', content)
    this.cookieHandler
      .write('tutu', content)

    assert.equal(this.cookieHandler.has('toto'), true,
      'testHasWithNamespace: should have toto')
    assert.equal(this.cookieHandler.has('tutu'), true,
      'testHasWithNamespace: should have tutu')
    assert.equal(this.cookieHandler.has('titi'), false,
      'testHasWithNamespace: should not have titi')
  }

}

runTest(DocumentCookieHandlerTest)
