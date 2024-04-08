import {TestCase} from '@flexio-oss/code-altimeter-js'
import {ColorHelper} from '../js/ColorHelper.js'

const assert = require('assert')

export class TestColorTest extends TestCase {
  testRGBToHex1() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgb(255,26,3)'), '#ff1a03ff')
  }

  testRGBToHex2() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgb(255 26 3)'), '#ff1a03ff')
  }

  testRGBToHex3() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgb(100%, 10%, 1%)'), '#ff1902ff')
  }

  testRGBToHex4() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgb(100% 10% 1%)'), '#ff1902ff')
  }

  testRGBAToHexa1() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgba(255,26,3,0.5)'), '#ff1a0380')
  }

  testRGBAToHexa2() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgba(255 26 3 / 0.5)'), '#ff1a0380')
  }

  testRGBAToHexa3() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgba(100%,10%,1%,0.5)'), '#ff190280')
  }

  testRGBAToHexa4() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgba(100%,10%,1%,50%)'), '#ff190280')
  }

  testRGBAToHexa5() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgba(100% 10% 1% / 0.5)'), '#ff190280')
  }

  testRGBAToHexa6() {
    assert.deepStrictEqual(ColorHelper.RGBToHex('rgba(100% 10% 1% / 50%)'), '#ff190280')
  }

  testhexToRGB1() {
    assert.deepStrictEqual(ColorHelper.hexToRGB('#ff1a03'), 'rgb(255,26,3,1)')
  }

  testhexaToRGBA1() {
    assert.deepStrictEqual(ColorHelper.hexToRGB('#ff1a0380'), 'rgb(255,26,3,0.5)')
  }

  testRGBToHSL1() {
    assert.deepStrictEqual(ColorHelper.RGBToHSL('rgb(0,255,255)'), 'hsl(180,100%,50%,1)')
  }

  testHSLToRGB1() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsl(180,100%,50%)'), 'rgb(0,255,255,1)')
  }

  testHSLToRGB2() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsl(180deg,100%,50%)'), 'rgb(0,255,255,1)')
  }

  testHSLToRGB3() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsl(180deg,100%,50%)'), 'rgb(0,255,255,1)')
  }

  testHSLToRGB4() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsl(3.14rad,100%,50%)'), 'rgb(0,255,251,1)')
  }

  testHSLToRGB5() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsl(0.5turn,100%,50%)'), 'rgb(0,255,255,1)')
  }

  testHSLAToRGBA1() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsla(180,100%,50%,50%)'), 'rgb(0,255,255,0.5)')
  }

  testHSLAToRGBA2() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsla(180deg,100%,50%,50%)'), 'rgb(0,255,255,0.5)')
  }

  testHSLAToRGBA3() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsla(180deg,100%,50%,50%)'), 'rgb(0,255,255,0.5)')
  }

  testHSLAToRGBA4() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsla(3.14rad,100%,50%,0.5)'), 'rgb(0,255,251,0.5)')
  }

  testHSLAToRGBA5() {
    assert.deepStrictEqual(ColorHelper.HSLToRGB('hsla(0.5turn,100%,50%,50%)'), 'rgb(0,255,255,0.5)')
  }

  testHexToHSL() {
    assert.deepStrictEqual(ColorHelper.hexToHSL('#00FFFF'), 'hsl(180,100%,50%,1)')
  }

  testHexaToHSLA() {
    assert.deepStrictEqual(ColorHelper.hexToHSL('#00FFFFFF'), 'hsl(180,100%,50%,1)')
  }

  testChangeLightness1() {
    assert.deepStrictEqual(new ColorHelper('#00FFFF').changeLightness(20), 'hsl(180,100%,70%,1)')
  }

  testChangeLightness2() {
    assert.deepStrictEqual(new ColorHelper('#00FFFFFF').changeLightness(20), 'hsl(180,100%,70%,1)')
  }

  testChangeLightness5() {
    assert.deepStrictEqual(new ColorHelper('rgb(0,255,255,50%)').changeLightness(20), 'hsl(180,100%,70%,0.5)')
  }

  testChangeLightness6() {
    assert.deepStrictEqual(new ColorHelper('rgba(0,255,255,100%)').changeLightness(20), 'hsl(180,100%,70%,1)')
  }

  testChangeLightness7() {
    assert.deepStrictEqual(new ColorHelper('hsl(180,100%,50%)').changeLightness(20), 'hsl(180,100%,70%,1)')
  }

  testChangeLightness8() {
    assert.deepStrictEqual(new ColorHelper('hsl(180,100%,50%)').changeLightness(-50), 'hsl(180,100%,0%,1)')
  }

  testChangeLightness9() {
    assert.deepStrictEqual(new ColorHelper('hsl(180,100%,50%)').changeLightness(-60), 'hsl(180,100%,0%,1)')
  }

  testChangeLightness10() {
    assert.deepStrictEqual(new ColorHelper('hsl(180,100%,50%)').changeLightness(60), 'hsl(180,100%,100%,1)')
  }

  testBrightness1() {
    assert.deepStrictEqual(new ColorHelper('hsl(0,0%,100%)').isLight(), true)
  }

  testBrightness2() {
    assert.deepStrictEqual(new ColorHelper('hsl(0,0%,100%)').isWhite(), true)
  }

  testBrightness3() {
    assert.deepStrictEqual(new ColorHelper('hsl(0,0%,100%)').isDark(), false)
  }

  testBrightness4() {
    assert.deepStrictEqual(new ColorHelper('hsl(0,0%,0%)').isLight(), false)
  }

  testBrightness5() {
    assert.deepStrictEqual(new ColorHelper('hsl(0,0%,0%)').isWhite(), false)
  }

  testBrightness6() {
    assert.deepStrictEqual(new ColorHelper('hsl(0,0%,0%)').isDark(), true)
  }

  testBrightness7() {
    assert.deepStrictEqual(new ColorHelper('hsl(45,64%,60%)').isLight(), true)
  }

  testBrightness8() {
    assert.deepStrictEqual(new ColorHelper('hsl(45,64%,60%)').isWhite(), false)
  }

  testBrightness9() {
    assert.deepStrictEqual(new ColorHelper('hsl(45,64%,60%)').isDark(), false)
  }

}

runTest(TestColorTest)
