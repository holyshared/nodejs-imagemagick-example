'use strict';

const BaseResizer = require('./base');
const convertImage = require('./convert-image');
const writeImageFile = require('./write-image-file');

module.exports = class Base64Resizer extends BaseResizer {
  saveAs(output) {
    return convertImage(this.input, this.options).then((resizedImage) => {
      return writeImageFile(output, resizedImage);
    });
  }
}
