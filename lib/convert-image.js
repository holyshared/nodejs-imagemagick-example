const magick = require('imagemagick-native');

module.exports = function convertImage(buffer, options) {
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
