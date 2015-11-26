'use strict';

app.factory('LightFactory', ['$http', '$interval', function ($http, $interval) {
  var LightService = {}

  LightService.lights = [];
  LightService.predefined = [{
    active: false, startTime: 300000, currentTime: {milli:300000, timer: "00:00"}, name: 'Sova', api: 'sleep'
  }];
  LightService.currentFunction = false;

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

  };

  LightService.increase = function(index, light){
    var param = {id: (index+1), state: {}};
    param.state = {"on":true, "bri": light.state.bri+25, "xy":[0.3852,0.3737]}
    return $http({
      method: 'PUT',
      url: '/api/lights/',
      json: true,
      headers: { 'Content-Type': 'application/json' },
      data: param
    }).success(function(promise) {
      console.log(promise);
      light.state.on = promise.on;
      light.state.bri = promise.bri;
    })
    .error(function (promise) {
      console.error(promise);
    });

  };

  LightService.decrease = function(index, light){
    var param = {id: (index+1), state: {}};
    param.state = {"on":true, "bri": light.state.bri-25, "xy":[0.3852,0.3737]}
    return $http({
      method: 'PUT',
      url: '/api/lights',
      json: true,
      headers: { 'Content-Type': 'application/json' },
      data: param
    }).success(function(promise) {
      console.log(promise);
      light.state.on = promise.on;
      light.state.bri = promise.bri;
    })
    .error(function (promise) {
      console.error(promise);
    });

  };

  LightService.usePredefined = function(index){
    return $http({
      method: (LightService.predefined[index].active ? 'DELETE' : 'PUT'),
      url: '/api/lights/' + LightService.predefined[index].api,
      json: true,
      headers: { 'Content-Type': 'application/json' }
    }).success(function(promise) {
        LightService.predefined[index].currentTime.milli = LightService.predefined[index].startTime;
        LightService.predefined[index].currentTime.timer = msToTime(LightService.predefined[index].currentTime.milli);

      if(LightService.predefined[index].active){
        LightService.predefined[index].active = false;
        stopCountdown();
      }else{
        LightService.predefined[index].active = true;
        countdown(LightService.predefined[index]);
      }
    })
    .error(function (promise) {
      console.error(promise);
    });

  };

  function togglePrefab(set){
    set.active = !set.active;
  }

  var stop;
  function countdown(set) {
    stop = $interval(function(){
      set.currentTime.timer = msToTime(set.currentTime.milli);
      set.currentTime.milli = set.currentTime.milli-1000;
      if(set.currentTime.milli <= 0){
        togglePrefab(set);
        stopCountdown();
      }
    }, 1000);
  }

  function stopCountdown() {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
    }
  }

  function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
    , seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60)
    , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return (minutes.length === 1 ? "0"+minutes : minutes) + ":" + (seconds.length === 1 ? "0" + seconds : seconds);
  }
  return LightService;
}]);
