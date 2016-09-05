const fs = require('fs');

global.assert = require('power-assert');

global.readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer);
    });
  });
}
