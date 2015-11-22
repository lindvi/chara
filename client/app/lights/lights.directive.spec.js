'use strict';

describe('Directive: lights', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/lights/lights.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<lights></lights>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the lights directive');
  }));
});