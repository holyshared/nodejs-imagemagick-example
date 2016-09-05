'use strict';

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
}
