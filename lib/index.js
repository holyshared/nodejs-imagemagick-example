'use strict';

const FileResizer = require('./file');
const Base64Resizer = require('./base64');

const resizer = module.exports;

resizer.fromFile = function fromFile(file) {
  return new FileResizer(file);
}

resizer.fromBase64URL = function fromBase64URL(url) {
  const base64String = url.replace(/data:image\/png;base64,/, '');
  const buffer = new Buffer(base64String, 'base64');
  return new Base64Resizer(buffer);
}
