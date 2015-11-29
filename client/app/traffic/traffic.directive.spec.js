'use strict';

describe('Directive: traffic', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/traffic/traffic.html'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
