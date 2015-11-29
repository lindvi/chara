'use strict';

describe('Directive: lights', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/lights/lights.html'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
