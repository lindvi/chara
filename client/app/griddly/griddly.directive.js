'use strict';

app.directive('griddly', function () {
  return {
    templateUrl: 'app/griddly/griddly.html',
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      $scope.grid = {
        width: 2,
        height: 2,
        containers: [],
        add: function(basicObject) {
          basicObject.htmlWidth = ((basicObject.width/$scope.grid.width)*100);
          basicObject.htmlHeight = ((basicObject.height/$scope.grid.height)*100);
          basicObject.posX = basicObject.x*((basicObject.width/$scope.grid.width)*100);
          basicObject.posY = basicObject.y*((basicObject.height/$scope.grid.height)*100);
          $scope.grid.containers.push(basicObject);
        }
      };

      $scope.grid.add({
        width: 1,
        height: 2,
        x: 0,
        y: 0,
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
        view: 'app/views/_clock.html'
      });

      $scope.grid.add({
        width: 1,
        height: 1,
        x: 1,
        y: 0,
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      });
      $scope.grid.add({
        width: 1,
        height: 1,
        x: 1,
        y: 1,
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      });
    }
  };
});
