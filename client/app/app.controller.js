'use strict';
/* global app:false */

app.controller('ApplicationController', ['$scope', 'BackgroundFactory', function($scope, BackgroundFactory){
  $scope.randomizeBackground = function(){
    BackgroundFactory.randomImage();
  };
}]);
