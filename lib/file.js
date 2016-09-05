'use strict';

const fs = require('fs');
const BaseResizer = require('./base');

const convertImage = require('./convert-image');
const readImageFile = require('./read-image-file');
const writeImageFile = require('./write-image-file');

module.exports = class FileResizer extends BaseResizer {
  saveAs(output) {
    return readImageFile(this.input).then((buffer) => {
      return convertImage(buffer, this.options);
    }).then((resizedImage) => {
      return writeImageFile(output, resizedImage);
    });
  }
}
