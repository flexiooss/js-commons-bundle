import {TestCase} from 'code-altimeter-js'
import {
  deepKeyAssigner,
  deepKeyResolver,
  deepFreezeSeal
} from '../js/objectHelpers'


const assert = require('assert')


export class TestObjectHelpers extends TestCase {
  testFreezeAndSealPrimitiveAndCo() {
    Object.freeze('a')
    Object.seal('a')
    Object.freeze(1)
    Object.seal(1)
    Object.freeze(true)
    Object.seal(true)
    Object.freeze(Symbol('s'))
    Object.seal(Symbol('s'))
    Object.freeze(new ArrayBuffer(10))
    Object.seal(new ArrayBuffer(10))
    Object.freeze(new Int8Array([]))
    Object.seal(new Int8Array([]))
    Object.freeze(new RegExp(''))
    Object.seal(new RegExp(''))
    Object.freeze(null)
    Object.seal(null)

    const a = {a: 1}
    Object.freeze(a)
    Object.seal(a)
    Object.freeze(a)
    Object.seal(a)
  }

  testDeepFreezeSeal() {
    const list1 = []
    const c = new Map()
    c.set('list', list1)
    const list2 = []
    const d = new Set()
    d.add(list2)

    let o = {
      'a': {
        'a1': 1,
        'a2': null,
        'a3': [1, 2, 3, {
          'a1-1': 2
        }]
      },
      'b': 'plok',
      'c': c,
      'd': d
    }
    const length = Object.entries(o).length
    // Test modification IMPOSSIBLE
    const res = deepFreezeSeal(o)
    try {
      res['a']['a1'] = 5
    } catch (e) {
    }

    assert.throws(() => {
      res['a']['a1'] = 5
    })
    assert(res['a']['a1'] === 1, 'Test modification IMPOSSIBLE de propriété')

    assert.throws(() => {
      res['a']['a3'].push('paf')
    })

    assert.throws(() => {
      res['a']['a3'][3]['a1-1'] = 'boum'
    })

    assert.deepEqual(res['a']['a3'], [1, 2, 3, {
      'a1-1': 2
    }], 'Test modification IMPOSSIBLE de list')

    assert.throws(() => {
      res['c'].set('toto', 'baboum')
    })
    assert.throws(() => {
      res['d'].add('baboum')
    })
    assert.throws(() => {
      res['c'].clear()
    })
    assert.throws(() => {
      res['d'].clear()
    })
    assert.throws(() => {
      res['c'].get('list').push('boum?')
    })
    assert.throws(() => {
      list1.push('boum?')
    })
    assert.throws(() => {
      list2.push('boum?')
    })
    // Test deep modification IMPOSSIBLE
    try {
      res['b'] = 'ship'
    } catch (e) {
    }
    assert(res['b'] === 'plok')

    // Test add property IMPOSSIBLE
    try {
      res['z'] = 5
    } catch (e) {
    }
    assert(Object.entries(res).length === length)
  }

  testDeepKeyResolver() {
    let o = {
      'a': 1,
      'b': 'plok',
      'c': {
        '42': {
          'x': null,
          'y': true
        }
      }
    }
    o.c['@plouc/bam'] = 'boum'

    assert(deepKeyResolver(o, 'a') === 1)

    assert.throws(() => {
        deepKeyResolver(o, 'a.b')
      },
      /^Error: No __chunckValue for this path !$/
    )

    assert(deepKeyResolver(o, 'c.42.x', '.') === null)
    assert(deepKeyResolver(o, 'c.42.y', '.') === true)
    assert(deepKeyResolver(o, 'c.@plouc/bam') === 'boum')
  }

  testDeepKeyAssigner() {
    let o = {
      'a': {
        'a1': 1
      },
      'b': 'plok'
    }

    deepKeyAssigner(o, 'c', 42)
    assert(o['c'] === 42)

    deepKeyAssigner(o, 'a.b', null)
    assert(o['a']['b'] === null)

    deepKeyAssigner(o, 'a.a2.x', false)
    assert(o['a']['a2']['x'] === false)
  }

}


runTest(TestObjectHelpers)
