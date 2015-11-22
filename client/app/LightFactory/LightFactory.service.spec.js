'use strict';

describe('Service: LightFactory', function () {

  // load the service's module
  beforeEach(module('charaApp'));

  // instantiate service
  var LightFactory;
  beforeEach(inject(function (_LightFactory_) {
    LightFactory = _LightFactory_;
  }));

  it('should do something', function () {
    expect(!!LightFactory).toBe(true);
  });

});
