'use strict';

describe('Directive: griddly', function () {

  // load the directive's module and view
  beforeEach(module('charaApp'));
  beforeEach(module('app/griddly/griddly.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<griddly></griddly>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the griddly directive');
  }));
});