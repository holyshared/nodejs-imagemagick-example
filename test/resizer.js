const Resizer = require('../lib');

describe('Resizer', function () {
  describe('saveAs', function () {
    beforeEach(function () {
      this.resizer = Resizer.fromFile('test/fixtures/png-fixture.png');
    });
    it('resized image', function () {
      return this.resizer.saveAs('/tmp/foo.png').then((file) => {
        assert.ok('/tmp/foo.png' === file);
      });
    });
  });
});
