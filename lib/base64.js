'use strict';

const BaseResizer = require('./base');
const image = require('./image');

module.exports = class Base64Resizer extends BaseResizer {
  saveAs(output) {
    return image.convert(this.input, this.options).then((resizedImage) => {
      return image.write(output, resizedImage);
    });
  }
}
