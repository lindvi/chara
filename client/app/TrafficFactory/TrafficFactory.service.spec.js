'use strict';

describe('Service: TrafficFactory', function () {

  // load the service's module
  beforeEach(module('charaApp'));

  // instantiate service
  var TrafficFactory;
  beforeEach(inject(function (_TrafficFactory_) {
    TrafficFactory = _TrafficFactory_;
  }));

  it('should do something', function () {
    expect(!!TrafficFactory).toBe(true);
  });

});
