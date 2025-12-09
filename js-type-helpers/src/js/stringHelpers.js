import {isNull, TypeCheck} from '../../../assert/index.js'
import {encode, decode} from 'html-entities';

/**
 * @param {String} input
 * @returns {boolean}
 */
export const isEmpty = (input) => {
  return isNull(input) || input === ''
}

/**
 * @param {String} word
 * @returns {String}
 */
export const firstUppercase = (word) => {
  let res = word.toLowerCase()
  return res[0].toUpperCase() + res.slice(1)
}

/**
 * @param {String} word
 * @param {String} sep
 * @param {Boolean} firstUpper
 * @returns {String}
 */
export const camelCase = (word, sep = '_', firstUpper = true) => {
  let words = word.split(sep)
  let res = ''
  let i = 0
  let countOfWords = words.length
  if (!firstUpper) {
    res += words[0].toLowerCase()
    i = 1
  }
  for (i; i < countOfWords; i++) {
    res += firstUppercase(words[i])
  }
  return res
}

/**
 * @param {RegExp} regexp
 * @param {String} str
 * @returns {Array}
 */
export const matchAll2Array = (regexp, str) => {
  // let array = [...str.matchAll(regexp)]; // Node not compatible
  let matches = []
  str.replace(regexp, function () {
    let arr = ([]).slice.call(arguments, 0)
    let extras = arr.splice(-2)
    arr.index = extras[0]
    arr.input = extras[1]
    matches.push(arr)
  })
  return matches.length ? matches : null
}
/**
 * @param {string} input
 * @param  {number } expectedLength
 * @param {string} replaceWith
 * @returns {string}
 */
export const padLeft = (input, expectedLength, replaceWith) => {
  return Array(expectedLength - String(input).length + 1).join(replaceWith || '0') + input;
}

/**
 * @param {?string} str
 * @param {string} [separator='-']
 * @return {string}
 */
export const slugify = (str, separator = '-') => {
  TypeCheck.assertIsStringOrNull(str)
  TypeCheck.assertIsString(separator)
  if (isNull(str)) return ''

  str = str.normalize('NFD')
  str = str.replace('#', '')
  str = str.replace(separator, '#')
  str = str.replace(/[^A-Za-z0-9#\s_-]/g, '')
  str = str.trim()
  str = str.replace(/\s+/g, separator)
  str = str.replace('#', separator)

  return str
}

/**
 * @param {string} str
 * @return {string}
 */
export const escapeRegExp = (str) => 'escape' in RegExp ? RegExp.escape(str) : str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 *
 * @param {string} str Input text
 * @param {boolean} [replaceMode=true] Use replace instead of insert
 * @return {string}
 */
export const nl2br = (str, replaceMode = true) => {
  const breakTag = '<br />'
  const replaceStr = (replaceMode) ? '$1' + breakTag : '$1' + breakTag + '$2';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}


/**
 * @param {string} str Input text
 * @param {boolean} [replaceMode=true] Use replace instead of insert
 * @return {string}
 */
export const br2nl = (str, replaceMode = true) => {
  const replaceStr = (replaceMode) ? "\n" : "\n" + '$1';
  return str.replace(/(<\s*\/?br\s*[\/]?>)/gi, replaceStr);
}

/**
 * @param {string} txt
 * @param {RegExp} regexp
 * @param {object} dict
 * @param {string} [defaultValue='']
 * @return {string}
 */
export const replaceFromDict = (txt, regexp, dict, defaultValue = '') => {
  return txt.replace(regexp, (m) => dict?.[m] ?? defaultValue)
}


/**
 * @param {string} input
 * @return {string}
 * @throws {Base64EncoderException}
 */
export const stripHTMLTags = (input) => {
  if (typeof globalThis.DOMParser === 'undefined') return input.replace(/(<([^>]+)>)/gi, "")
  return new globalThis.DOMParser().parseFromString(input, "text/html").body.textContent
}

/**
 * @param {string} text
 * @param {string} [tag='p']
 * @return {number}
 */
export const countRootStringHTMLElement = (text, tag = 'p') => {
  const RE = new RegExp(`<\/?\s*${tag}\s*[^>]*>`, 'g')
  const chunks = text.match(RE);
  let res = 0;
  let embeded_open = 0;
  let root_open = 0;
  if (!isNull(chunks) && chunks.length > 0) {
    for (const htmlTag of chunks) {
      if (htmlTag.startsWith('</')) {
        if (embeded_open > 0) {
          embeded_open--
        } else {
          root_open--;
          res++;
        }
      } else {
        if (root_open > 0) {
          embeded_open++
        } else {
          root_open++;
        }
      }
    }
  }
  return res;
}

/**
 * @param {string} text
 * @return {string}
 */
export const decodeHTMLEntities = (text) => {
  return decode(text);
}
/**
 * @param {string} text
 * @return {string}
 */
export const encodeHTMLEntities = (text) => {
  return encode(text);
}

