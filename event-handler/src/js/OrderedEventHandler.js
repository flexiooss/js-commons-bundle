import {assertInstanceOf, isFunction} from './__import__assert.js'
import {StringArray} from './__import__flex-types.js'
import {EventHandlerBase} from './EventHandlerBase.js'
import {sortMap} from './__import__js-type-helpers.js'
import {OrderedEventListenerConfig} from './OrderedEventListenerConfig.js'
import {OrderedEventListenerConfigBuilder} from "./OrderedEventListenerConfigBuilder.js";


/**
 * @extends {EventHandlerBase}
 */
export class OrderedEventHandler extends EventHandlerBase {
  /**
   *
   * @param {OrderedEventListenerConfig|function(OrderedEventListenerConfigBuilder):OrderedEventListenerConfig} orderedEventListenerConfig
   * @return {(String|StringArray)}
   * @throws AssertionError
   * @override
   */
  addEventListener(orderedEventListenerConfig) {
    if (isFunction(orderedEventListenerConfig)) {
      orderedEventListenerConfig = orderedEventListenerConfig.call(null, new OrderedEventListenerConfigBuilder())
    }

    assertInstanceOf(orderedEventListenerConfig, OrderedEventListenerConfig, 'OrderedEventListenerConfig')

    const ids = new StringArray()

    for (const event of orderedEventListenerConfig.events()) {
      this._ensureHaveListenersMap(event)
      this._ensureHaveAsyncListenersMap(event)

      const id = this.nextID()
      if (orderedEventListenerConfig.async()) {
        this._asyncListeners.get(event).set(id, orderedEventListenerConfig)
      } else {
        this._listeners.get(event).set(id, orderedEventListenerConfig)

        this._listeners.set(event,
          sortMap(
            this._listeners.get(event),
            (a, b) => {
              return a.value.priority() - b.value.priority()
            }
          )
        )
      }
      ids.push(id)
    }

    return ids.length > 1 ? ids : ids.first()
  }

}
