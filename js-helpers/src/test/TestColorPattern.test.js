import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ColorPatterns} from '../js/ColorHelper.js'

const assert = require('assert')

export class TestColorPatternTest extends TestCase {
  testHSL() {
    let hsl
    hsl = 'hsl(240, 100%, 50%)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')

    hsl = 'hsl(240, 100%, 50%, 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsl(240,100%,50%,0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsl(180deg, 100%, 50%, 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '180deg')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsl(3.14rad, 100%, 50%, 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '3.14rad')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsl(200grad, 100%, 50%, 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '200grad')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsl(0.5turn, 100%, 50%, 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '0.5turn')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsl(-240, -100%, -50%, -0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '-240')
    assert.deepStrictEqual(hsl[2], '-100%')
    assert.deepStrictEqual(hsl[3], '-50%')
    assert.deepStrictEqual(hsl[4], '-0.1')

    hsl = 'hsl(+240, +100%, +50%, +0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '+240')
    assert.deepStrictEqual(hsl[2], '+100%')
    assert.deepStrictEqual(hsl[3], '+50%')
    assert.deepStrictEqual(hsl[4], '+0.1')

    hsl = 'hsl(240.5, 99.99%, 49.999%, 0.9999)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240.5')
    assert.deepStrictEqual(hsl[2], '99.99%')
    assert.deepStrictEqual(hsl[3], '49.999%')
    assert.deepStrictEqual(hsl[4], '0.9999')

    hsl = 'hsl(.9, .99%, .999%, .9999)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '.9')
    assert.deepStrictEqual(hsl[2], '.99%')
    assert.deepStrictEqual(hsl[3], '.999%')
    assert.deepStrictEqual(hsl[4], '.9999')

    hsl = 'hsl(0240, 0100%, 0050%, 01)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '0240')
    assert.deepStrictEqual(hsl[2], '0100%')
    assert.deepStrictEqual(hsl[3], '0050%')
    assert.deepStrictEqual(hsl[4], '01')

    hsl = 'hsl(240.0, 100.00%, 50.000%, 1.0000)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240.0')
    assert.deepStrictEqual(hsl[2], '100.00%')
    assert.deepStrictEqual(hsl[3], '50.000%')
    assert.deepStrictEqual(hsl[4], '1.0000')

    hsl = 'hsl(2400, 1000%, 1000%, 10)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '2400')
    assert.deepStrictEqual(hsl[2], '1000%')
    assert.deepStrictEqual(hsl[3], '1000%')
    assert.deepStrictEqual(hsl[4], '10')

    hsl = 'hsl(-2400.01deg, -1000.5%, -1000.05%, -100)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '-2400.01deg')
    assert.deepStrictEqual(hsl[2], '-1000.5%')
    assert.deepStrictEqual(hsl[3], '-1000.05%')
    assert.deepStrictEqual(hsl[4], '-100')

    hsl = 'hsl(2.40e+2, 1.00e+2%, 5.00e+1%, 1E-3)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '2.40e+2')
    assert.deepStrictEqual(hsl[2], '1.00e+2%')
    assert.deepStrictEqual(hsl[3], '5.00e+1%')
    assert.deepStrictEqual(hsl[4], '1E-3')

    hsl = 'hsl(240 100% 50%)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')

    hsl = 'hsl(240 100% 50% / 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'hsla(240, 100%, 50%)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')

    hsl = 'hsla(240, 100%, 50%, 0.1)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
    assert.deepStrictEqual(hsl[4], '0.1')

    hsl = 'HSL(240Deg, 100%, 50%)'.match(ColorPatterns.hslPattern())
    assert.deepStrictEqual(hsl[1], '240Deg')
    assert.deepStrictEqual(hsl[2], '100%')
    assert.deepStrictEqual(hsl[3], '50%')
  }

  testHue() {
    assert.deepStrictEqual(ColorPatterns.formatHue('240'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('2.40e+2'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('-2400.01deg'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('0.5turn'), 180)
    assert.deepStrictEqual(ColorPatterns.formatHue('3.14rad'), 179)
    assert.deepStrictEqual(ColorPatterns.formatHue('200grad'), 180)
    assert.deepStrictEqual(ColorPatterns.formatHue('240Deg'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('2400'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('240.0'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('240.5'), 240)
    assert.deepStrictEqual(ColorPatterns.formatHue('240.5'), 240)
  }

  testCssNumber() {
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('.99%'), 0)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('100%'), 100)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('1.00e+2%'), 100)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('-1000.5%'), 100)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('1000%'), 100)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('100.00%'), 100)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('0100%'), 100)
    assert.deepStrictEqual(ColorPatterns.formatPercentNumber('0100%'), 100)
  }

  testAlpha() {
    assert.deepStrictEqual(ColorPatterns.formatAlpha('0.1'), 0.1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('10%'), 0.1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('1E-1'), 0.1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('1E-1'), 0.1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('-0.1'), 0)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('01'), 1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('10'), 1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('.9999'), 1)
    assert.deepStrictEqual(ColorPatterns.formatAlpha('0.9999'), 1)
  }

  testRGB() {
    let rgb = 'rgb(34, 12, 64, 0.6)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '0.6')

    rgb = 'rgba(34, 12, 64, 0.6)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '0.6')

    rgb = 'rgba(34, 12, 64, .6)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '.6')

    rgb = 'rgb(34 12 64 / 0.6)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '0.6')

    rgb = 'rgba(34 12 64 / 0.3)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '0.3')

    rgb = 'rgb(34.0 12 64 / 60%)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34.0')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '60%')

    rgb = 'rgba(34.6 12 64 / 30%)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '34.6')
    assert.deepStrictEqual(rgb[2], '12')
    assert.deepStrictEqual(rgb[3], '64')
    assert.deepStrictEqual(rgb[4], '30%')

    rgb = 'rgba(0, 255, 255)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '0')
    assert.deepStrictEqual(rgb[2], '255')
    assert.deepStrictEqual(rgb[3], '255')

    rgb = 'rgba(0, 255, 255, .5)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '0')
    assert.deepStrictEqual(rgb[2], '255')
    assert.deepStrictEqual(rgb[3], '255')
    assert.deepStrictEqual(rgb[4], '.5')

    rgb = 'rgba(0, 255, 255, 0.5)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '0')
    assert.deepStrictEqual(rgb[2], '255')
    assert.deepStrictEqual(rgb[3], '255')
    assert.deepStrictEqual(rgb[4], '0.5')

    rgb = 'rgba(0 255 255 / 0.5)'.match(ColorPatterns.rgbPattern())
    assert.deepStrictEqual(rgb[1], '0')
    assert.deepStrictEqual(rgb[2], '255')
    assert.deepStrictEqual(rgb[3], '255')
    assert.deepStrictEqual(rgb[4], '0.5')

  }

}

runTest(TestColorPatternTest)