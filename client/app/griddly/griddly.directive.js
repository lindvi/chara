'use strict';

app.directive('griddly', ['$http', '$window', '$timeout', function ($http, $window, $timeout) {
  return {
    templateUrl: 'app/griddly/griddly.html',
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      $scope.pictures = [];
      $scope.grid = {
        pxWidth: 2,
        pxHeight: 2,
        page: {
          width: 2,
          height: 2
        },
        rows: 2,
        columns: 2,
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
          height: 1,
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

$http({
  method: 'GET',
  url: 'https://www.reddit.com/r/earthporn.json'
}).success(function(promise) {
  $scope.pictures = promise.data.children;
  setBackground(Math.round(Math.random()*$scope.pictures.length));
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
