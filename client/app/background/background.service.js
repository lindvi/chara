'use strict';
/* global app:false */

app.factory('BackgroundFactory', ['$http', function ($http) {
  var backgroundFactory = {};
  backgroundFactory.images = [];
  backgroundFactory.current = {};

  backgroundFactory.fetchImages = function() {
    return $http({
      method: 'GET',
      url: 'https://www.reddit.com/r/earthporn.json'
    }).success(function(promise) {
      backgroundFactory.images = promise.data.children;
    });
  };

  backgroundFactory.randomImage = function() {
    backgroundFactory.setImage(Math.round(Math.random()*backgroundFactory.images.length));
  };

  backgroundFactory.setImage = function(index) {
    backgroundFactory.current = backgroundFactory.images[index];
    if(backgroundFactory.current !== undefined && backgroundFactory.current.data.domain === 'imgur.com'){
      backgroundFactory.current.data.url = backgroundFactory.current.data.url +'.jpg';
    }

    angular.element('.bgImg').css({
      'background-image': 'url(' + backgroundFactory.current.data.url +')',
      'background-size' : 'cover'
    });
  };

  return backgroundFactory;
}]);
