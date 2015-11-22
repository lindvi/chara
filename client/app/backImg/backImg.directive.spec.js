'use strict';

describe('Directive: backImg', function () {

  // load the directive's module
  beforeEach(module('charaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<back-img></back-img>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the backImg directive');
  }));
});