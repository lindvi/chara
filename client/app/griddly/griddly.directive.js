'use strict';
/* global app:false */

app.directive('griddly', ['$http', '$window', '$timeout', 'BackgroundFactory', function ($http, $window, $timeout, BackgroundFactory) {
  return {
    templateUrl: 'app/griddly/griddly.html',
    restrict: 'EA',
    link: function ($scope) {

      BackgroundFactory.fetchImages().success(function() {
        BackgroundFactory.randomImage();
      });

      $scope.grid = {
        pxWidth: 2,
        pxHeight: 2,
        page: {
          width: 2,
          height: 2
        },
        rows: 2,
        columns: 2,
        currentX: 0,
        currentY: 0,
        containers: [],
        init: function(){
          $scope.grid.pxWidth = angular.element('body').width();
          $scope.grid.pxHeight = angular.element('body').height();
        },
        add: function(basicObject) {
          basicObject.htmlWidth = ((basicObject.width/$scope.grid.page.width)*$scope.grid.pxWidth);
          basicObject.htmlHeight = ((basicObject.height/$scope.grid.page.height)*$scope.grid.pxHeight);
          basicObject.posX = basicObject.x*((basicObject.width/$scope.grid.page.width)*$scope.grid.pxWidth);
          basicObject.posY = basicObject.y*((basicObject.height/$scope.grid.page.height)*$scope.grid.pxHeight);
          $scope.grid.containers.push(basicObject);
        }
      };

      $timeout(function() {
        $scope.grid.init();
        $scope.grid.add({
          width: 1,
          height: 2,
          x: 0,
          y: 0,
          color: '#'+Math.floor(Math.random()*16777215).toString(16),
          view: 'app/views/_clock.html',
          blur: true
        });

        $scope.grid.add({
          width: 1,
          height: 1,
          x: 1,
          y: 0,
          color: '#'+Math.floor(Math.random()*16777215).toString(16),
          view: 'app/views/_lights.html',
          blur: false
        });
        $scope.grid.add({
          width: 1,
          height: 1,
          x: 1,
          y: 1,
          color: '#'+Math.floor(Math.random()*16777215).toString(16),
          view: 'app/views/_traffic.html',
          blur: false
        });

        $scope.grid.add({
          width: 1,
          height: 1,
          x: 0,
          y: 1,
          color: '#'+Math.floor(Math.random()*16777215).toString(16),
          view: 'app/views/_calendar.html',
          blur: false
        });

      }, 1000);

      $scope.goToPage = function(x, y) {
        $scope.grid.currentX = x;
        $scope.grid.currentY = y;
      };

      $scope.range = function(n) {
        return new Array(n);
      };

      $scope.swipe = function(dir) {
        console.log(dir);
      };

}
};
}]);
