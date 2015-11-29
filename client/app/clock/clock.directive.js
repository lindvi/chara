'use strict';
/* global app:false */

app.directive('clock', ['$interval', function ($interval) {
  return {
    templateUrl: 'app/clock/clock.html',
    restrict: 'E',
    replace: true,
    link: function ($scope) {
     var tick = function() {
      $scope.clock = Date.now();
      };
    tick();
    $interval(tick, 1000);
  }
};
}]);
