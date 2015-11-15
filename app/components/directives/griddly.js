'use strict';

app.directive('griddly', [function(){
  // Runs during compile
  return {
    name: 'griddly',
    // priority: 1,
    // terminal: true,
    scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: '/views/directives/_griddly.main.html',
    replace: true,
    //transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.grid = {};

      $scope.grid.containers = [];

      $scope.grid.columns = 2;
      $scope.grid.rows = 2;


      $scope.grid.containers.push({
        x: 0,
        y: 0,
        height: 2,
        width: 1,
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      });

      $scope.grid.containers.push({
        x: 1,
        y: 0,
        height: 1,
        width: 1,
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      });

      $scope.grid.containers.push({
        x: 1,
        y: 1,
        height: 1,
        width: 1,
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      });
    }
  };
}]);
