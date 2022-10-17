import {assertType, assert, isNode, isNull, isBoolean, isNumber} from './__import__assert'

/**
 *
 * @param {Node} node
 * @param {number} [start=0]
 * @param {number} [end=node.childNodes.length]
 * @return {boolean}
 * @throws AssertionError
 */
export const removeChildNodes = (node, start, end) => {
  assertType(isNode(node),
    'removeChildNodes: `node` argument assert be Node')
  start = start || 0
  end = end || node.childNodes.length

  if (!node.hasChildNodes()) {
    return false
  }

  assert(!!(start <= end),
    'removeChildNodes: `welcome` assert be less than `end`')

  while (start < end) {
    node.removeChild(node.childNodes[start])
    end--
  }
}

/**
 * @param {HTMLElement} el
 * @return {boolean}
 */
export const checkOverflow = (el) => {
  return el.clientWidth < el.scrollWidth
    || el.clientHeight < el.scrollHeight
}

/**
 * @param {HTMLElement} el
 * @param {function(HTMLElement):boolean} check
 * @param {HTMLElement} stop
 * @return {?HTMLElement}
 */
export const getParentNode = (el, check, stop = null) => {
  let node = el
  const breaker = !isNull(stop) ? stop : document.body
  while (!check.call(null, node)) {
    if (node === breaker) {
      return null
    }
    node = node.parentNode
  }
  return node
}

const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;

/**
 * @param url
 * @return {string}
 */
export const sanitizeUrl = (url) => {
  url = String(url);
  if (url.match(SAFE_URL_PATTERN)) return url;

  if ((typeof __ASSERT__ !== 'undefined') && __ASSERT__ === true) {
    console.error(`[SECURITY] WARNING: sanitizing unsafe URL value ${url}`);
  }
  return 'unsafe:' + url;
}

/**
 * @param {HTMLElement} el
 * @param {string} html
 * @return {HTMLElement}
 */
export const safeInnerHTML = (el, html) => {
  el.innerHTML = escapeForBrowser(html)
  return el
}

const matchHtmlRegExp = /["'&<>]/;
/**
 * @param {string} text
 * @return {string}
 */
export const escapeForBrowser = (text) => {
  if (isBoolean(text) || isNumber(text)) return '' + text

  const str = '' + text;
  const match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = '';
  let index;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#x27;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
