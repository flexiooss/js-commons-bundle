import {assertInstanceOf, isFunction, isNull} from '../../../../assert'

export class BuilderHelper {
  /**
   * @param {?HaveBuilder|function(Builder):Builder} builder
   * @param {Class<HaveBuilder>} constructor
   * @param {?string} stringName
   * @param canBeNull
   * @returns {*}
   */
  consume(builder, constructor, stringName, canBeNull) {
    let object = builder
    if (isFunction(builder)) {
      object = builder.call(null, constructor.builder()).build()
    }
    if (!canBeNull && isNull(object)) {
      object = constructor.builder().build()
    }
    assertInstanceOf(object, constructor, stringName)
    return object
  }
}