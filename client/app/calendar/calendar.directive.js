'use strict';

angular.module('charaApp')
  .directive('calendar', function () {
    return {
      templateUrl: 'app/calendar/calendar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });