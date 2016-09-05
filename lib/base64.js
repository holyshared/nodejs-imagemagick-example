'use strict';

const BaseResizer = require('./base');

module.exports = class Base64Resizer extends BaseResizer {
  saveAs(output) {
    return this._convertImage(this.input).then((resizedImage) => {
      return this._writeImageFile(output, resizedImage);
    });
  }
}
