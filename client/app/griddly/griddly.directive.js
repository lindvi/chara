'use strict';

app.directive('griddly', ['$http', function ($http) {
  return {
    templateUrl: 'app/griddly/griddly.html',
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      $scope.pictures = [];
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

      $http({
        method: 'GET',
        url: 'https://www.reddit.com/r/earthporn.json'
      }).success(function(promise) {
        $scope.pictures = promise.data.children;
        setBackground(Math.round(Math.random()*$scope.pictures.length));
      });



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



      function setBackground(index) {
        $scope.background = $scope.pictures[index];
        if($scope.background.data.domain === 'imgur.com'){
          $scope.background.data.url = $scope.background.data.url +'.jpg';
        }

        angular.element('.bgImg').css({
          'background-image': 'url(' + $scope.background.data.url +')',
          'background-size' : 'cover'
        });
      }
    }
  };
}]);
