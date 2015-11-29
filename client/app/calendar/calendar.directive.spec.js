'use strict';

describe('Directive: calendar', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/calendar/calendar.html'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
