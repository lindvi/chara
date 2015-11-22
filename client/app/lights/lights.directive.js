'use strict';

app.directive('lights', ['LightFactory', '$timeout', function (LightFactory, $timeout) {
  return {
    templateUrl: 'app/lights/lights.html',
    restrict: 'E',
    replace: true,
    link: function ($scope, element, attrs) {
      $scope.factory = LightFactory;

      $scope.factory.getLights().success(function(promise){
        $scope.lights = promise;
      });

      $scope.toggleLight = function(index, light){
        LightFactory.toggleLight(index, light);
      };

      $scope.usePredefined = function(type) {
        LightFactory.usePredefined(type);
      };
    }
  };
}]);
