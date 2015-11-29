'use strict';
/* global app:false */

app.factory('TrafficFactory', ['$http', function ($http) {
  var TrafficFactory = {};
  TrafficFactory.stations = [];

  TrafficFactory.stations = function(param) {
    return $http({
      method: 'POST',
      url: '/api/traffic',
      json: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(param)
    }).success(function(promise) {
      TrafficFactory.stations = promise.ResponseData;
      return promise.ResponseData;
    })
    .error(function (promise) {
      console.error(promise);
    });
  };

  TrafficFactory.timetableForStation = function(id) {
    return $http({
      method: 'POST',
      url: '/api/traffic/timetable',
      json: true,
      headers: { 'Content-Type': 'application/json' },
      data: {'siteId': id}
    }).success(function(promise) {
      return promise;
    })
    .error(function (promise) {
      console.error(promise);
    });
  };

  return TrafficFactory;
}]);
