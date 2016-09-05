'use strict';

const image = require('./image');
const BaseResizer = require('./base');

module.exports = class FileResizer extends BaseResizer {
  saveAs(output) {
    return image.read(this.input).then((buffer) => {
      return image.convert(buffer, this.options);
    }).then((resizedImage) => {
      return image.write(output, resizedImage);
    });
  }
}
