'use strict';

const FileResizer = require('./file');
const Base64Resizer = require('./base64');

exports.fromFile = function fromFile(file) {
  return new FileResizer(file);
}

exports.fromBase64URL = function fromBase64URL(url) {
  const encoding = /data:image\/(png|jpeg|gif);base64,/;
  const base64String = url.replace(encoding, '');
  const buffer = new Buffer(base64String, 'base64');
  return new Base64Resizer(buffer);
}
