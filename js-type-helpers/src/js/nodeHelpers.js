import {assertType, assert,isNode} from './__import__assert'

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
export const checkOverflow=(el)=>
{
  return  el.clientWidth < el.scrollWidth
    || el.clientHeight < el.scrollHeight
}
