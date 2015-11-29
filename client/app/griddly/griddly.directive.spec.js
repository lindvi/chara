'use strict';

describe('Directive: griddly', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/griddly/griddly.html'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
