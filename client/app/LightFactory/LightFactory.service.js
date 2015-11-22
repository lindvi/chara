'use strict';

app.factory('LightFactory', ['$http' , function ($http) {
  var LightService = {}

  LightService.lights = [];

  LightService.getLights = function(){
    return $http.get('/api/lights').success(function(promise) {
      return promise;
    }).error(function(promise){
      console.error(promise);
    });
  }

  LightService.toggleLight = function(index, light){

    var param = {id: (index+1), state: {}};
    param.state = {"on":!light.state.on, "bri": 254, "xy":[0.3852,0.3737]}
    return $http({
      method: 'PUT',
      url: '/api/lights',
      json: true,
      headers: { 'Content-Type': 'application/json' },
      data: param
    }).success(function(promise) {
      light.state.on = promise.on;
    })
    .error(function (promise) {
      console.error(promise);
    });

  }

  LightService.usePredefined = function(type){
    if(type === 'sleep'){
          return $http({
      method: 'PUT',
      url: '/api/lights/sleep',
      json: true,
      headers: { 'Content-Type': 'application/json' }
    }).success(function(promise) {
      console.log(promise);
    })
    .error(function (promise) {
      console.error(promise);
    });
    }

  }

  return LightService;
}]);
