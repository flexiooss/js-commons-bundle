import {TestCase} from '@flexio-oss/code-altimeter-js'
import {HotLogLevel, HotLogLevelHelper} from "../js/HotLogLevel";
import {Log} from "../js/Log";
import {RangeFilter, RangeFilterBuilder} from "../js/transporters/filters/RangeFilter";
import {FilterListHandler} from "../js/transporters/filters/FilterListHandler";
import {FilterList} from "../js/transporters/filters/FilterList";
import {ThresholdResolver} from "../js/transporters/helpers/ThresholdResolver";

const assert = require('assert')

export class TestLogger extends TestCase {

  testLevelHelper() {
    assert.ok(HotLogLevelHelper.equals(HotLogLevel.DEBUG, HotLogLevel.DEBUG), 'should be equals')
    assert.ok(HotLogLevelHelper.lte(HotLogLevel.DEBUG, HotLogLevel.DEBUG), 'should be lte')
    assert.ok(HotLogLevelHelper.gte(HotLogLevel.DEBUG, HotLogLevel.DEBUG), 'should be gte')
    assert.ok(HotLogLevelHelper.lt(HotLogLevel.DEBUG, HotLogLevel.INFO), 'should be lt')
    assert.ok(HotLogLevelHelper.gt(HotLogLevel.DEBUG, HotLogLevel.TRACE), 'should be gte')
  }

  testThreshold() {
    /**
     * @type {Log}
     */
    const log = new Log('MyTest', HotLogLevel.WARN, 'ça ne marche pas', {bla: "bla"})

    assert.ok(new ThresholdResolver(HotLogLevel.DEBUG).pass(log), 'should pass without filters')
    assert.ok(!new ThresholdResolver(HotLogLevel.ERROR).pass(log), 'should not pass without filters')
    assert.ok(
      new ThresholdResolver(
        HotLogLevel.DEBUG,
        new FilterListHandler().replaceFilters(
          new FilterList(
            new RangeFilterBuilder()
              .matchEmitter(new RegExp('^My'))
              .build(),
            new RangeFilterBuilder()
              .maxLevelWarn()
              .build()
          )
        ))
        .pass(log)
      , 'should pass with filters 1')

    assert.ok(
      new ThresholdResolver(
        HotLogLevel.ERROR,
        new FilterListHandler().replaceFilters(
          new FilterList(
            new RangeFilterBuilder()
              .matchEmitter(new RegExp('^My'))
              .build(),
            new RangeFilterBuilder()
              .maxLevelWarn()
              .build()
          )
        ))
        .pass(log)
      , 'should pass with filters 2')

    assert.ok(
      new ThresholdResolver(
        HotLogLevel.ERROR,
        new FilterListHandler().replaceFilters(
          new FilterList(
            new RangeFilterBuilder()
              .matchEmitter(new RegExp('^My'))
              .build(),
            new RangeFilterBuilder()
              .maxLevelDebug()
              .build()
          )
        ))
        .pass(log)
      , 'should pass with filters 3')

    assert.ok(
      !new ThresholdResolver(
        HotLogLevel.ERROR,
        new FilterListHandler().replaceFilters(
          new FilterList(
            new RangeFilterBuilder()
              .matchEmitter(new RegExp('^Tr'))
              .build(),
            new RangeFilterBuilder()
              .maxLevelDebug()
              .build()
          )
        ))
        .pass(log)
      , 'should not pass with filters 1')
  }

  testRangeFilterSimple() {
    const log = new Log('MyTest', HotLogLevel.WARN, 'ça ne marche pas', {bla: "bla"})
    assert.ok(
      new RangeFilterBuilder().build().match(log),
      'should pass empty'
    )

    assert.ok(
      new RangeFilterBuilder().minLevelInfo().build().match(log),
      'should pass with minLevel'
    )
    assert.ok(
      ! new RangeFilterBuilder().minLevelError().build().match(log),
      'should not pass with minLevel'
    )

    assert.ok(
      new RangeFilterBuilder().maxLevelError().build().match(log),
      'should pass with maxLevel'
    )
    assert.ok(
      !new RangeFilterBuilder().maxLevelDebug().build().match(log),
      'should not pass with maxLevel'
    )

    assert.ok(
      new RangeFilterBuilder().matchEmitter(new RegExp('^My')).build().match(log),
      'should pass with matchEmitter'
    )

    assert.ok(
      !new RangeFilterBuilder().matchEmitter(new RegExp('^Truc')).build().match(log),
      'should not pass with matchEmitter'
    )

    assert.ok(
      new RangeFilterBuilder().matchMessage(new RegExp('pas$')).build().match(log),
      'should pass with matchMessage'
    )

    assert.ok(
      !new RangeFilter(
        null,
        null,
        null,
        new RegExp('bam$'),
        null
      ).match(log),
      'should not pass with matchMessage'
    )

    assert.ok(
      new RangeFilter(
        null,
        null,
        null,
        null,
        (log) => {
          return log.context().bla === 'bla'
        }
      ).match(log),
      'should pass with logMatch'
    )

    assert.ok(
      !new RangeFilter(
        null,
        null,
        null,
        null,
        (log) => {
          return false
        }
      ).match(log),
      'should not pass with logMatch'
    )
  }

  testRangeFilterMultiple() {
    const log = new Log('MyTest', HotLogLevel.WARN, 'ça ne marche pas', {bla: "bla"})
    assert.ok(
      new RangeFilter(
        HotLogLevel.DEBUG,
        HotLogLevel.ERROR,
        new RegExp('^My'),
        new RegExp('pas$'),
        (log) => {
          return log.context().bla === 'bla'
        }
      ).match(log),
      'should  pass'
    )

    assert.ok(
      !new RangeFilter(
        HotLogLevel.DEBUG,
        HotLogLevel.ERROR,
        new RegExp('^My'),
        new RegExp('pas$'),
        (log) => {
          return false
        }
      ).match(log),
      'should not pass'
    )

    assert.ok(
      !new RangeFilter(
        HotLogLevel.DEBUG,
        HotLogLevel.ERROR,
        new RegExp('^Truc'),
        new RegExp('pas$'),
        (log) => {
          return log.context().bla === 'bla'
        }
      ).match(log),
      'should not pass'
    )
  }

  testFilters() {
    const log = new Log('MyTest', HotLogLevel.WARN, 'ça ne marche pas', {bla: "bla"})

    assert.ok(new FilterListHandler().match(log), 'should pass')
    assert.ok(new FilterListHandler().replaceFilters(new FilterList()).match(log), 'should pass')

    assert.ok(new FilterListHandler().replaceFilters(
        new FilterList(
          new RangeFilter(
            HotLogLevel.DEBUG,
            HotLogLevel.ERROR,
            new RegExp('^Truc'),
            new RegExp('pas$'),
            (log) => {
              return log.context().bla === 'bla'
            }
          ),
          new RangeFilter(
            HotLogLevel.DEBUG,
            HotLogLevel.ERROR,
            new RegExp('^My'),
            new RegExp('pas$'),
            (log) => {
              return false
            }
          ),
          new RangeFilter(
            HotLogLevel.DEBUG,
            HotLogLevel.ERROR,
            new RegExp('^My'),
            new RegExp('pas$'),
            (log) => {
              return log.context().bla === 'bla'
            }
          )
        )
      ).match(log),
      'should pass')

    assert.ok(!new FilterListHandler().replaceFilters(
        new FilterList(
          new RangeFilter(
            HotLogLevel.DEBUG,
            HotLogLevel.ERROR,
            new RegExp('^Truc'),
            new RegExp('pas$'),
            (log) => {
              return log.context().bla === 'bla'
            }
          ),
          new RangeFilter(
            HotLogLevel.DEBUG,
            HotLogLevel.ERROR,
            new RegExp('^My'),
            new RegExp('pas$'),
            (log) => {
              return false
            }
          )
        )
      ).match(log),
      'should not pass')
  }
}

runTest(TestLogger)
