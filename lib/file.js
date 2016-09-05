'use strict';

const fs = require('fs');
const BaseResizer = require('./base');

module.exports = class FileResizer extends BaseResizer {
  saveAs(output) {
    return this._readImageFile(this.input).then((buffer) => {
      return this._convertImage(buffer);
    }).then((resizedImage) => {
      return this._writeImageFile(output, resizedImage);
    });
  }
  _readImageFile(input) {
    return new Promise((resolve, reject) => {
      fs.readFile(input, (err, buffer) => {
        if (err) {
          return reject(err);
        }
        resolve(buffer);
      });
    });
  }
}
