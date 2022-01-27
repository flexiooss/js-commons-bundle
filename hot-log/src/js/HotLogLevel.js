import {FlexEnum} from '../../../flex-types'

class HotLogLevel extends FlexEnum {

}

HotLogLevel.initEnum(['TRACE','DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'])

/**
 * @property {HotLogLevel} HotLogLevel#TRACE
 * @property {HotLogLevel} HotLogLevel#DEBUG
 * @property {HotLogLevel} HotLogLevel#INFO
 * @property {HotLogLevel} HotLogLevel#WARN
 * @property {HotLogLevel} HotLogLevel#ERROR
 * @property {HotLogLevel} HotLogLevel#FATAL
 */
export {HotLogLevel}
