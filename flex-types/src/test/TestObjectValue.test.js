/* global runTest */
import '../../package'
import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ObjectValue, ObjectValueBuilder} from  '../../src/js/ObjectValue'
import {IndexError} from '../js/IndexError'

const assert = require('assert')


export class TestObjectValue extends TestCase {
  testBuildAndGet() {

    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .stringValue('stringNull', null)
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', 'roro', 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob3 = ObjectValue
      .builder()
      .stringValue('string', 'titi')
      .booleanValue('bool', false)
      .numberValue('number', 42)
      .arrayValue('array', ['tutu', 'bibi', 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('primitiveArray', ['tutu', true, null, 12])
      .arrayValue('complexArray', [ob3, ['tutu', true, null, 12, ob]])
      .objectValueValue('object', ob)
      .build()

    assert.ok(ob.stringValue('string') === 'toto', 'stringValue')

    assert.ok(ob.stringValue('stringNull') === null, 'stringNull')

    assert.ok(ob.stringValueOr('BadKey', 'default') === 'default', 'stringValueOr with bad key')

    assert.ok(ob.stringValueOr('number', 'default') === 'default', 'stringValueOr with bad type')

    assert.ok(ob2.booleanValue('bool') === true, 'booleanValue')
    assert.ok(ob2.booleanValueOr('badKey', false) === false, 'booleanValueOr')

    assert.ok(ob2.numberValue('number') === 12, 'numberValue')
    assert.ok(ob2.numberValueOr('badKey', 14) === 14, 'numberValueOr')

    assert.deepStrictEqual(ob2.arrayValue('primitiveArray').toArray(), ['tutu', true, null, 12], 'arrayValue')

    assert.deepStrictEqual(ob2.arrayValueOr('badKey', ['bad', 'bad', 12]).toArray(), ['bad', 'bad', 12], 'arrayValueOr')

    assert.deepStrictEqual(ob2.objectValueValue('object').toObject(), ob.toObject(), 'objectValueValue')
    assert.deepStrictEqual(ob2.objectValueValueOr('badKey', ob3).toObject(), ob3.toObject(), 'objectValueValueOr')
  }

  testBuilder() {

    assert.deepStrictEqual(
      ObjectValueBuilder
        .fromObject({id: '2'})
        .build().toObject(),
      {id: '2'},
      'ObjectValue.fromObject simple')

    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()

    assert.ok(ob2.equals(ObjectValue.from(ob2).build()), 'ObjectValue.from')

    assert.ok(ob2.equals(ObjectValue.fromObject(ob2.toObject()).build()), 'ObjectValue.fromObject')

    assert.ok(ob2.equals(ObjectValue.fromJson(JSON.stringify(ob2.toJSON())).build()), 'ObjectValue.fromJson')

    assert.ok(JSON.stringify(ob2.toJSON()) === '{"string":"toto","bool":true,"number":12,"array":["tutu",false,12,{"string":"toto","bool":true,"number":12,"array":["tutu",true,12]},["tutu",true,12]],"object":{"string":"toto","bool":true,"number":12,"array":["tutu",true,12]}}', 'toJSON')

  }

  testEquals() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()

    const ob2Bis = ObjectValue.from(ob2).build()

    assert.ok(ob2 === ob2, 'strict equality', 1)
    assert.ok(ob2 !== ob2Bis, 'not strict equality', 2)
    assert.ok(ob2.equals(ob2Bis), 'equals', 3)

    assert.ok(
      !ObjectValue
        .builder()
        .stringValue('string', 'toto')
        .booleanValue('bool', true)
        .numberValue('number', 12)
        .arrayValue('array', ['tutu', true, 12])
        .build()
        .equals(
          ObjectValue
            .builder()
            .stringValue('stringo', 'toto')
            .booleanValue('boolo', true)
            .numberValue('numbero', 12)
            .arrayValue('arrayo', ['tutu', true, 12])
            .build()
        ), 4
    )

    assert.ok(
      !ObjectValue
        .builder()
        .stringValue('string', 'toto')
        .booleanValue('bool', true)
        .numberValue('number', 12)
        .arrayValue('array', ['tutu', true, 12])
        .build()
        .equals(
          ObjectValue
            .builder()
            .stringValue('string', null)
            .booleanValue('bool', true)
            .numberValue('number', 12)
            .arrayValue('array', ['tutu', true, 12])
            .build()
        ), 5
    )

    assert.ok(
      !ObjectValue
        .builder()
        .stringValue('string', 'toto')
        .booleanValue('bool', true)
        .numberValue('number', 12)
        .arrayValue('array', ['tutu', true, 12])
        .build()
        .equals(
          ObjectValue
            .builder()
            .stringValue('string', 'toto')
            .booleanValue('bool', true)
            .numberValue('number', 12)
            .arrayValue('array', ['tuta', true, 12])
            .build()
        ), 6
    )

    assert.ok(
      !ObjectValue
        .builder()
        .stringValue('string', 'toto')
        .booleanValue('bool', true)
        .numberValue('number', 12)
        .arrayValue('array', ['tutu', true, 12])
        .build()
        .equals(
          null
        ), 7
    )

    assert.ok(
      ObjectValue.builder()
        .objectValueValue(
          'a',
          ObjectValue.builder()
            .arrayValue('b', [1, 2, 3, 'EXPECTED', 5])
            .build()
        )
        .build().equals(
        ObjectValue.builder()
          .objectValueValue(
            'a',
            ObjectValue.builder()
              .arrayValue('b', [1, 2, 3, 'EXPECTED', 5])
              .build()
          )
          .build()
      ),
      8
    )

    assert.ok(!
        ObjectValue.builder()
          .objectValueValue(
            'a',
            ObjectValue.builder()
              .objectValueValue('b',
                ObjectValue.builder()
                  .arrayValue('c', [1, 2, 3])
                  .build()
              )
              .build()
          )
          .build().equals(
          ObjectValue.builder()
            .objectValueValue(
              'a',
              ObjectValue.builder()
                .arrayValue('b', [1, 2,
                  ObjectValue.builder()
                    .arrayValue('c', [1, 2, 'EXPECTED'])
                    .build()
                  , 4, 5])
                .build()
            )
            .build()
        ),
      9
    )

  }

  testWith() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    /**
     * @type {ObjectValue}
     */
    const ob2 = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()

    const ob3 = ob2.withBooleanValue('bool', false)

    assert.ok(ob3.rawValue('bool') === false, 'get')
    assert.ok(ob3.equals(ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', false)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', false, 12, ob, ['tutu', true, 12]])
      .objectValueValue('object', ob)
      .build()
    ), 'compare instance')

    const ob4 = ob2.withBooleanValue('bool', true)
    assert.ok(ob2 !== ob4, 'immutability : not same instance')
    assert.ok(ob2.equals(ob4), 'immutability : equals')

  }

  testSize() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    assert.ok(ob.size() === 4, 'size')
  }

  testProperties() {
    /**
     * @type {ObjectValue}
     */
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    const size = ob.size()
    const properties = ob.properties()

    const propertyNames = ob.propertyNames()

    for (let i = 0; i < size; ++i) {
      assert.deepStrictEqual(properties[i], ob.rawValue(propertyNames[i]), 'key : ' + propertyNames[i])
    }
  }

  testException() {
    const ob = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    assert.throws(() => {
      ob.stringValue('number'),
        TypeError
    })

    assert.throws(() => {
      ob.stringValue('badKey'),
        IndexError
    })

    assert.throws(() => {
      ob.rawValue('badKey'),
        IndexError
    })
  }


  testMerge(){
    const a = ObjectValue
      .builder()
      .stringValue('string', 'toto')
      .booleanValue('bool', true)
      .numberValue('number', 12)
      .arrayValue('array', ['tutu', true, 12])
      .build()

    const b = ObjectValue
      .builder()
      .stringValue('string', 'tutu')
      .stringValue('other-string', 'tutu')
      .arrayValue('array', ['titi', false, 14,15])
      .build()

    const c = a.mergeWith(b)
    assert.ok(c.stringValue('string'),'tutu', 'assert `string` overrided' )

    assert.deepStrictEqual(
      c.toObject(),
      {
        string: 'tutu',
        bool: true,
        number: 12,
        array: [ 'titi', false, 14, 15 ],
        'other-string': 'tutu'
      }, 'should be merged'
    )
  }
}


runTest(TestObjectValue)
