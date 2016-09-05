'use strict';

const fs = require('fs');
const magick = require('imagemagick-native');
const Base64Resizer = require('./base64');

module.exports = class Resizer {
  constructor(input) {
    this.input = input;
    this.cleanup = false;
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
  cleanup() {
    this.cleanup = true;
    return this;
  }
  saveAs(output) {
    return this._readImageFile(this.input).then((buffer) => {
      return this._convertImage(buffer);
    }).then((resizedImage) => {
      return this._writeImageFile(output, resizedImage);
    }).then((resizedImageFile) => {
      if (!this.cleanup) {
        return resizedImageFile;
      }
      return unlinkImageSource(this.input)
        .then(() => resizedImageFile)
        .catch((_) => resizedImageFile);
    });
  }
  _readImageFile(input) {
    if (input instanceof Buffer) {
      return Promise.resolve(input);
    }

    return new Promise((resolve, reject) => {
      fs.readFile(input, (err, buffer) => {
        if (err) {
          return reject(err);
        }
        resolve(buffer);
      });
    });
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
  static fromFile(output) {
    return new Resizer(output);
  }
  static fromBase64URL(url) {
    const base64String = url.replace(/data:image\/png;base64,/, '');
    const buffer = new Buffer(base64String, 'base64');
    return new Base64Resizer(buffer);
  }
}

function unlinkImageSource(src) {
  return new Promise((resolve, reject) => {
    fs.unlink(src, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
