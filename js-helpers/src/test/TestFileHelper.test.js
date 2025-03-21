import {TestCase} from '@flexio-oss/code-altimeter-js'
import {FileHelper} from '../js/FileHelper.js'
import {bigText} from "./bigText.js";

const assert = require('assert')

export class TestFileHelperTest extends TestCase {
  // debug = true

  testFileRule() {
    [
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', mimeTypeOrExtension: '*/*', expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', mimeTypeOrExtension: 'txt', expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', mimeTypeOrExtension: 'text/plain', expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', mimeTypeOrExtension: 'text/*', expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', mimeTypeOrExtension: 'image/*', expected: false
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', mimeTypeOrExtension: 'jpeg', expected: false
      },
    ].forEach((test, k) => {
      if (FileHelper.validateFileFromRule(test.fileName, test.fileMimeType, test.mimeTypeOrExtension) !== test.expected) {
        throw new Error(`Test failed at ${k}, ${JSON.stringify(test)}`);
      }
    });
  }

  testValidateFile() {
    [
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: null, forbidden: null,expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['*/*'], forbidden: null, expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['txt'], forbidden: null,expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['jpg','txt'], forbidden: null,expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['text/plain'], forbidden: null,expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['text/*'], forbidden: null,expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['image/*'], forbidden: null,expected: false
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: ['jpeg'], forbidden: null,expected: false
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: null, forbidden: ['jpeg'],expected: true
      },
      {
        fileName: 'toto.txt', fileMimeType: 'text/plain', accept: null, forbidden: ['txt'],expected: false
      },
    ].forEach((test, k) => {
      if (FileHelper.validateFileFrom(test.fileName, test.fileMimeType, test.accept, test.forbidden) !== test.expected) {
        throw new Error(`Test failed at ${k}, ${JSON.stringify(test)}`);
      }
    });
  }

}

runTest(TestFileHelperTest)
