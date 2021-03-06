'use strict';
/* global app:false */

app.directive('lights', ['LightFactory', function (LightFactory) {
  return {
    templateUrl: 'app/lights/lights.html',
    restrict: 'E',
    replace: true,
    link: function ($scope) {
      $scope.factory = LightFactory;
      $scope.prefabs = LightFactory.predefined;
      $scope.factory.getLights().success(function(promise){
        $scope.lights = promise;
      });

      $scope.increaseBrightness = function(index, light){
        LightFactory.increase(index, light);
      };

      $scope.decreaseBrightness = function(index, light){
        LightFactory.decrease(index, light);
      };

      $scope.toggleLight = function(index, light){
        LightFactory.toggleLight(index, light);
      };

      $scope.usePredefined = function(type) {
        LightFactory.usePredefined(type);
      };
    }
  };
}]);
