const Resizer = require('../lib');

describe('Resizer', function () {
  describe('saveAs', function () {
    context('when file', function () {
      beforeEach(function () {
        this.resizer = Resizer.fromFile('test/fixtures/png-fixture.png');
      });
      it('resized image', function () {
        return this.resizer.saveAs('/tmp/foo.png').then((file) => {
          assert.ok('/tmp/foo.png' === file);
        });
      });
    });
    context('when base64 image', function () {
      beforeEach(function () {
        return readFile('test/fixtures/base64.txt').then((buffer) => {
          this.resizer = Resizer.fromBase64URL(buffer.toString());
        });
      });
      it('resized image', function () {
        return this.resizer.saveAs('/tmp/base64.png').then((file) => {
          assert.ok('/tmp/base64.png' === file);
        });
      });
    });
  });
});
