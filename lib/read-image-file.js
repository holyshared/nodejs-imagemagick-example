const fs = require('fs');

module.exports = function readImageFile(input) {
  return new Promise((resolve, reject) => {
    fs.readFile(input, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer);
    });
  });
}
