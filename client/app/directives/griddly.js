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
    templateUrl: '_griddly.main.html',
    //replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.grid = {
        width: 2,
        height: 2,
        cell: {
          '00': {x:0,y:0,content: '00', width: 50, height: 50, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
          '01': {x:0,y:0,content: '01', width: 50, height: 50, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
          '10': {x:0,y:0,content: '10', width: 50, height: 50, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
          '11': {x:0,y:0,content: '01', width: 50, height: 50, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
        }
      };
    }
  };
}]);
