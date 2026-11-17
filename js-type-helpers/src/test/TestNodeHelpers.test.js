import {TestCase} from '@flexio-oss/code-altimeter-js'
import {JSDOM} from 'jsdom'
import {sanitizeHTMLElement, sanitizeHTMLTree} from '../js/nodeHelpers.js'

const assert = require('assert')

export class TestNodeHelpers extends TestCase {
  /**
   * @type {Document}
   */
  #document

  setUp() {
    this.#document = new JSDOM('<!DOCTYPE html><body></body>').window.document
  }

  /**
   * @param {string} html
   * @return {HTMLElement}
   */
  #container(html) {
    const container = this.#document.createElement('div')
    container.insertAdjacentHTML('beforeend', html)
    return container
  }

  /**
   * @param {Element} element
   * @return {string[]}
   */
  #attributeNames(element) {
    return Array.from(element.attributes, attribute => attribute.name)
  }

  testSanitizeElementRemovesSingleEventHandler() {
    const img = this.#container('<img src="x" onerror="alert(1)">').firstElementChild
    sanitizeHTMLElement(img)
    assert.deepStrictEqual(this.#attributeNames(img), ['src'])
  }

  testSanitizeElementRemovesConsecutiveEventHandlers() {
    const img = this.#container('<img src="x" onclick="a" onerror="alert(1)">').firstElementChild
    sanitizeHTMLElement(img)
    assert.deepStrictEqual(this.#attributeNames(img), ['src'])
  }

  testSanitizeElementRemovesOnlyEventHandlers() {
    const img = this.#container('<img onclick="a" onload="b" onerror="c" onmouseover="d">').firstElementChild
    sanitizeHTMLElement(img)
    assert.deepStrictEqual(this.#attributeNames(img), [])
  }

  testSanitizeElementRemovesEventHandlersCaseInsensitively() {
    const img = this.#container('<img ONCLICK="a" OnError="alert(1)" alt="ok">').firstElementChild
    sanitizeHTMLElement(img)
    assert.deepStrictEqual(this.#attributeNames(img), ['alt'])
  }

  testSanitizeElementKeepsSafeAttributes() {
    const link = this.#container('<a href="https://flexio.fr" class="f-link" title="t">x</a>').firstElementChild
    sanitizeHTMLElement(link)
    assert.deepStrictEqual(this.#attributeNames(link), ['href', 'class', 'title'])
    assert.strictEqual(link.getAttribute('href'), 'https://flexio.fr')
  }

  testSanitizeElementNeutralizesJavascriptUrlAfterEventHandler() {
    const link = this.#container('<a onclick="a" href="javascript:alert(1)">x</a>').firstElementChild
    sanitizeHTMLElement(link)
    assert.deepStrictEqual(this.#attributeNames(link), ['href'])
    assert.strictEqual(link.getAttribute('href'), 'unsafe:javascript:alert(1)')
  }

  testSanitizeTreeRemovesConsecutiveEventHandlersInDescendants() {
    const container = this.#container('<p><span><img src="x" onclick="a" onerror="alert(1)"></span></p>')
    sanitizeHTMLTree(container)
    assert.strictEqual(container.innerHTML, '<p><span><img src="x"></span></p>')
  }

  testSanitizeTreeRemovesEventHandlersOnSiblings() {
    const container = this.#container('<b onclick="a" onfocus="b">1</b><svg onload="c" onerror="d"></svg>')
    sanitizeHTMLTree(container)
    assert.strictEqual(container.innerHTML, '<b>1</b><svg></svg>')
  }
}

runTest(TestNodeHelpers)
