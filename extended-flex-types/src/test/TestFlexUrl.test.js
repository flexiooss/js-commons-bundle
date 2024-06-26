/* global runTest */
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FlexUrl, FlexUrlBuilder} from '../js/FlexUrl.js'

const assert = require('assert')

export class TestFlexUrlTest extends TestCase {
  debug = false

  testEncodeUrl() {
    const a = new FlexUrl('https://monsite.com/truc?bibi=tagada')
    assert.strictEqual(JSON.stringify(a), '{"href":"https://monsite.com/truc?bibi=tagada"}')
  }

  testEncodeDecodeMap() {
    const a = new FlexUrl('https://monsite.com/truc?bibi=tagada')
    const sa = JSON.stringify(a)
    const b = FlexUrlBuilder.fromJson(sa).build()

    assert.deepEqual(a, b)
  }

  testFullUrl() {
    const url = new FlexUrl('https://roger:pass@account.flexio.fr:8080/truc/bidule?toto=tutu&bibi=bobo#bam')
    assert.ok('https' === url.protocol())
    assert.ok('roger' === url.username())
    assert.ok('pass' === url.password())
    assert.ok('account.flexio.fr' === url.hostname())
    assert.deepStrictEqual(['account', 'flexio', 'fr'], url.hostnames())
    assert.ok('8080' === url.port())
    assert.ok('account.flexio.fr:8080' === url.host())
    assert.ok('/truc/bidule' === url.pathname())
    assert.ok('?toto=tutu&bibi=bobo' === url.search())
    assert.ok('toto=tutu&bibi=bobo' === url.search(true))
    assert.ok('#bam' === url.hash())
    assert.ok('bam' === url.hash(true))
  }

  testFullUrlEncoded() {
    const encoded = encodeURIComponent('a 2+2.coucou/ça"\'va#&?~{(|[-è`_^@)]}=,;:!%$*')
    this.log(encoded,'encoded')
    const url = new FlexUrl(`https://roger:pass@account.flexio.fr:8080/truc/${encoded}/bidule?toto=${encoded}&bibi=bobo#${encoded}`)
    assert.ok('https' === url.protocol())
    assert.ok('roger' === url.username())
    assert.ok('pass' === url.password())
    assert.ok('account.flexio.fr' === url.hostname())
    assert.deepStrictEqual(['account', 'flexio', 'fr'], url.hostnames())
    assert.ok('8080' === url.port())
    assert.ok('account.flexio.fr:8080' === url.host(), 'host')
    assert.ok(`/truc/${encoded}/bidule` === url.pathname(), 'pathname')
    assert.ok(`?toto=${encoded}&bibi=bobo` === url.search(),'search')
    assert.ok(`toto=${encoded}&bibi=bobo` === url.search(true), 'search cleaned')
    assert.ok(`#${encoded}` === url.hash(), 'hash')
    assert.ok(encoded === url.hash(true), 'hash cleaned')
  }

  testFlexioApi() {
    const url = new FlexUrl('flexio-api://demo/ui/store')
    assert.ok('flexio-api' === url.protocol())
    assert.ok('demo' === url.hostname())
    assert.ok('/ui/store' === url.pathname())
  }
}

runTest(TestFlexUrlTest)
