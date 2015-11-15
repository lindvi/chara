'use strict';

app.directive('clock', ['$interval', function ($interval) {
  return {
    templateUrl: 'app/clock/clock.html',
    restrict: 'E',
    link: function ($scope, element, attrs) {
     var tick = function() {
      $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
  }
};
}]);
