import {globalFlexioImport} from './src/js/__import__global-import-registry'
import {deepKeyAssigner} from './src/js/__import__js-generator-helpers'


import {SymbolStringArray, SymbolStringArrayBuilder} from './src/js/FlexArray/SymbolStringArray'
import {URLExtended, URLExtendedBuilder} from './src/js/URLExtended'
import {URLSearchParamsExtended, URLSearchParamsExtendedBuilder} from './src/js/URLSearchParamsExtended'
import {DateExtended} from './src/js/DateExtended'
import {FlexTimeExtended} from './src/js/FlexTimeExtended'
import {FlexDateExtended} from './src/js/FlexDateExtended'
import {FlexDateTimeExtended} from './src/js/FlexDateTimeExtended'
import {ArrayMap} from './src/js/FlexMap/ArrayMap'
import {StringArrayMap, StringArrayMapBuilder} from './src/js/FlexMap/StringArrayMap'
import {StringMap, StringMapBuilder} from './src/js/FlexMap/StringMap'
import {FlexUrl, FlexUrlBuilder} from './src/js/FlexUrl'
import {FlexRegExp, FlexRegExpBuilder} from './src/js/FlexRegExp'
import {Any, AnyBuilder} from './src/js/Any'
import {FlexRegExpList} from "./src/js/FlexRegExpList";

/**
 * @property {Any} globalFlexioImport.io.flexio.extended_flex_types.Any
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.Any', Any)
/**
 * @property {AnyBuilder} globalFlexioImport.io.flexio.extended_flex_types.AnyBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.AnyBuilder', AnyBuilder)

/**
 * @property {FlexRegExp} globalFlexioImport.io.flexio.extended_flex_types.FlexRegExp
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.FlexRegExp', FlexRegExp)
/**
 * @property {FlexRegExpList} globalFlexioImport.io.flexio.extended_flex_types.FlexRegExpList
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.FlexRegExpList', FlexRegExpList)
/**
 * @property {FlexRegExpBuilder} globalFlexioImport.io.flexio.extended_flex_types.FlexRegExpBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.FlexRegExpBuilder', FlexRegExpBuilder)

/**
 * @property {DateExtended} globalFlexioImport.io.flexio.extended_flex_types.DateExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.DateExtended', DateExtended)

/**
 * @property {URLExtended} globalFlexioImport.io.flexio.extended_flex_types.URLExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLExtended', URLExtended)

/**
 * @property {URLExtendedBuilder} globalFlexioImport.io.flexio.extended_flex_types.URLExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLExtendedBuilder', URLExtendedBuilder)

/**
 * @property {SymbolStringArray} globalFlexioImport.io.flexio.extended_flex_types.SymbolStringArray
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.SymbolStringArray', SymbolStringArray)

/**
 * @property {SymbolStringArrayBuilder} globalFlexioImport.io.flexio.extended_flex_types.SymbolStringArrayBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.SymbolStringArrayBuilder', SymbolStringArrayBuilder)

/**
 * @property {URLSearchParamsExtended} globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLSearchParamsExtended', URLSearchParamsExtended)

/**
 * @property {URLSearchParamsExtendedBuilder} globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLSearchParamsExtendedBuilder', URLSearchParamsExtendedBuilder)

/**
 * @property {ArrayMap} globalFlexioImport.io.flexio.extended_flex_types.ArrayMap
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.ArrayMap', ArrayMap)

/**
 * @property {StringArrayMap} globalFlexioImport.io.flexio.extended_flex_types.StringArrayMap
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringArrayMap', StringArrayMap)

/**
 * @property {StringArrayMapBuilder} globalFlexioImport.io.flexio.extended_flex_types.StringArrayMapBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringArrayMapBuilder', StringArrayMapBuilder)

/**
 * @property {StringMap} globalFlexioImport.io.flexio.extended_flex_types.StringMap
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringMap', StringMap)

/**
 * @property {StringMapBuilder} globalFlexioImport.io.flexio.extended_flex_types.StringMapBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringMapBuilder', StringMapBuilder)

/**
 * @property {FlexUrl} globalFlexioImport.io.flexio.extended_flex_types.FlexUrl
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.FlexUrl', FlexUrl)
/**
 * @property {FlexUrlBuilder} globalFlexioImport.io.flexio.extended_flex_types.FlexUrlBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.FlexUrlBuilder', FlexUrlBuilder)

//export {StringArray}
//export {StringArrayBuilder}
export {FlexUrl}
export {FlexUrlBuilder}
export {URLExtended}
export {URLExtendedBuilder}
export {FlexTimeExtended, FlexDateExtended, FlexDateTimeExtended}
export {DateExtended}
export {SymbolStringArray}
export {SymbolStringArrayBuilder}
export {URLSearchParamsExtended}
export {URLSearchParamsExtendedBuilder}
export {ArrayMap}
export {StringArrayMap}
export {StringArrayMapBuilder}
export {StringMap}
export {StringMapBuilder}
export {BuilderInterface} from './src/js/BuilderInterface'
export {TypeCheck} from './src/js/TypeCheck'
export {DateFormatter, DateTimeFormatter, TimeFormatter} from './src/js/date-formatter/DateFormatter'
