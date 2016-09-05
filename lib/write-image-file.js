const fs = require('fs');

module.exports = function writeImageFile(output, buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(output, buffer, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(output);
    });
  });
}
