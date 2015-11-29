'use strict';

describe('Directive: clock', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/clock/clock.html'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
