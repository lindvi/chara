'use strict';
/* global app:false */

app.controller('ApplicationController', ['$scope', 'BackgroundFactory', function($scope, BackgroundFactory){
  $scope.menu = false;

  $scope.randomizeBackground = function(){
    BackgroundFactory.randomImage();
  };

  $scope.toggleMenu = function() {
    $scope.menu = !$scope.menu;
  }
}]);
