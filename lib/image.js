const fs = require('fs');
const magick = require('imagemagick-native');

exports.read = function readFile(input) {
  return new Promise((resolve, reject) => {
    fs.readFile(input, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer);
    });
  });
}

exports.write = function writeFile(output, buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(output, buffer, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(output);
    });
  });
}

exports.readStream = function readStream(file) {
  return fs.createReadStream(file);
}

exports.convert = function convertImage(buffer, options) {
  const opts = Object.create(options);
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
