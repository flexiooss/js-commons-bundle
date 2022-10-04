import {assertInstanceOfOrNull, isFunction, isNull} from '../../../../assert'

export class BuilderHelper {
  /**
   * @param {?HaveBuilder|function(Builder):Builder} builder
   * @param {Class<HaveBuilder>} constructor
   * @param {?string} stringName
   * @param {boolean} [canBeNull=false]
   * @returns {*}
   */
  static consume(builder, constructor, stringName, canBeNull = false) {
    let object = builder
    if (isFunction(builder)) {
      object = builder.call(null, constructor.builder()).build()
    }
    if (!canBeNull && isNull(object)) {
      object = constructor.builder().build()
    }
    assertInstanceOfOrNull(object, constructor, stringName)
    return object
  }
}