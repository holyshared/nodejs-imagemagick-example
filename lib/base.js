'use strict';

const fs = require('fs');
const magick = require('imagemagick-native');

module.exports = class BaseResizer {
  constructor(input) {
    this.input = input;
    this.options = {
      width: 200,
      height: 200,
      resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
      gravity: 'Center' // optional: position crop area when using 'aspectfill'
    };
  }
  size(size) {
    Object.assign(this.options, size);
    return this;
  }
  saveAs(output) {
  }
  _writeImageFile(output, buffer) {
    return new Promise((resolve, reject) => {
      fs.writeFile(output, buffer, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(output);
      });
    });
  }
  _convertImage(buffer) {
    const opts = Object.create(this.options);
    Object.assign(opts, { srcData: buffer });

    return new Promise((resolve, reject) => {
      magick.convert(opts, (err, resizedBuffer) => {
        if (err) {
          return reject(err);
        }
        resolve(resizedBuffer);
      });
    });
  }
}
