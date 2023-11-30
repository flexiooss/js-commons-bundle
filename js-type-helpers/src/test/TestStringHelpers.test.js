import {TestCase} from '@flexio-oss/code-altimeter-js'
import {
  br2nl,
  camelCase,
  firstUppercase,
  matchAll2Array,
  nl2br,
  padLeft,
  replaceFromDict,
  slugify
} from '../js/stringHelpers.js'

const assert = require('assert')

export class TestStringHelpers extends TestCase {
  debug = false

  testFirstUppercase() {
    let sentence = firstUppercase('always handle a teleporter.')
    assert(sentence === 'Always handle a teleporter.')
  }

  testCamelCase() {
    let sentence = camelCase('ginger_casserole_has_to_have_a_minced')
    assert(sentence === 'GingerCasseroleHasToHaveAMinced')

    sentence = camelCase('ginger casserole has to have a minced', ' ')
    assert(sentence === 'GingerCasseroleHasToHaveAMinced')

    sentence = camelCase('ginger|casserole|has|to|have|a|minced', '|', false)
    assert(sentence === 'gingerCasseroleHasToHaveAMinced')
  }

  testMatchAll() {
    let base = 'Everything we do is connected with courage: silence, energy, light, living'
    const res1 = matchAll2Array(new RegExp('e', 'g'), base)
    assert(res1.length === 9)
    assert(res1[0].index === 2)
    assert(res1[1].index === 12)

    const res2 = matchAll2Array(new RegExp('li', 'g'), base)
    assert(res2.length === 2)
    assert(res2[0].index === 61)
    assert(res2[1].index === 68)

    const res3 = matchAll2Array(new RegExp('plok', 'g'), base)
    assert(res3 === null)
  }

  testPadLeft() {
    assert(padLeft('123', 10, '0') === '0000000123')
  }

  testSlugify() {
    const a = ' g $ @ eu un µ '
    const aa = slugify(a)
    this.log(aa, 'aa')
    assert.equal(aa, 'g-eu-un', 'a should be slugified')

    const b = ' _ c\'est un truc de ôuf * 45 '
    const bb = slugify(b, '_')
    this.log(bb, 'bb')
    assert.equal(bb, '__cest_un_truc_de_ouf_45', 'b should be slugified')
  }

  testNl2Br() {
    const a =
      `coucou
comment
ça va
?`

    this.log(nl2br(a))
    this.log(nl2br(a, false))
    assert.equal("coucou<br />comment<br />ça va<br />?", nl2br(a), 'br should replace ln')
    assert.equal("coucou<br />\ncomment<br />\nça va<br />\n?", nl2br(a, false), 'br should be inserted before ln')
  }

  testBr2Nl() {

    const a = "coucou<br />comment<br />ça va<br />?"
    this.log(br2nl(a))
    this.log(br2nl(a, false))
    assert.equal("coucou\ncomment\nça va\n?", br2nl(a), 'br should be replaced by ln')
    assert.equal( "coucou\n<br />comment\n<br />ça va\n<br />?", br2nl(a, false), 'nl should be inserted after br')
  }

  testReplaceFromDict(){
    const a = '["coucou", "blabla"]'
    replaceFromDict(a, /\[\],/g,{"[":"(","]":")"})
    assert.equal('("coucou" "blabla")', replaceFromDict(a, /[\[\],]/g,{"[":"(","]":")"}), 'should be replaced from dict with default value empty')
    assert.equal('("coucou"boum "blabla")', replaceFromDict(a, /[\[\],]/g,{"[":"(","]":")"}, 'boum'), 'should be replaced from dict with custom  default value')
  }
}

runTest(TestStringHelpers)
