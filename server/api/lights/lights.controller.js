'use strict';

var _ = require('lodash');
var http = require('http');
var request = require('request');
var timeout;
var startSet;


exports.index = function(req, res) {
  http.get({
    host: '192.168.2.3',
    path: '/api/1593afc71aba483f67bb1b73f41cc2f/lights'
  }, function (response) {
    var buffer = "",
    data,
    route;

    response.on("data", function (chunk) {
      buffer += chunk;
    });

    response.on("end", function (err) {
      data = JSON.parse(buffer);
      res.send(data);
    });
  });
};


exports.toggle = function(req, res) {
  console.log(req.body.state);
  var options = {
    uri: 'http://192.168.2.3/api/1593afc71aba483f67bb1b73f41cc2f/lights/'+(req.body.id)+'/state',
    method: 'PUT',
    json: true,
    body: {"on": (req.body.bri === 0 ? false : req.body.state.on), "bri": (req.body.state.bri >= 250 ? 250 : req.body.state.bri), "xy": req.body.state.xy }
  };

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function() {
      if (buffer){
        try{
          data = JSON.parse(buffer);
          res.send(data);
        }catch(e){
          console.error(e); //error in the above string(in this case,yes)!
        }
      }
    });
  };


  request.put(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var resData = {"on": true, "bri": 0, "xy": [0,0]};
      var name = "";
      body.forEach(function(entry){
        if(entry.success){
          name = (Object.getOwnPropertyNames(entry.success)[0]);
          resData[(name.split('/state/')[1])] = entry.success[name];
        }
      });
      res.send(resData);
    }
  });

};



exports.sleep = function(req, res) {
  var lights = {};

  http.get({
    host: '192.168.2.3',
    path: '/api/1593afc71aba483f67bb1b73f41cc2f/lights'
  }, function (response) {
    var buffer = "",
    data,
    route;

    response.on("data", function (chunk) {
      buffer += chunk;
    });

    response.on("end", function (err) {
      lights = JSON.parse(buffer);
      startSet = JSON.parse(buffer);
      dimLights();
      timeout = setTimeout(function(){
        shutdownLights();
      }, 300000);
      res.send({type: 'sleep', active: true});
    });
  });



  function dimLights() {
    var keys = Object.keys(lights);

    keys.forEach(function(lightId){
     var options = {
      uri: 'http://192.168.2.3/api/1593afc71aba483f67bb1b73f41cc2f/lights/' + lightId + '/state',
      method: 'PUT',
      json: true,
      body: {"on": true, "bri": 1, "xy": [0.4575,0.4101] }
    };

    request.put(options, function (error, response, body) {});
  });
  }

  function shutdownLights() {
   var keys = Object.keys(lights);

   keys.forEach(function(lightId){
     var options = {
      uri: 'http://192.168.2.3/api/1593afc71aba483f67bb1b73f41cc2f/lights/' + lightId + '/state',
      method: 'PUT',
      json: true,
      body: {"on": false, "bri": 1, "xy": [0.4575,0.4101] }
    };

    request.put(options, function (error, response, body) {});
  });
 }
};

exports.cancelSleep = function(req, res) {
  clearTimeout(timeout);

  var keys = Object.keys(startSet);
  keys.forEach(function(lightId){
    console.log('Resetting: ' + lightId);
    var options = {
      uri: 'http://192.168.2.3/api/1593afc71aba483f67bb1b73f41cc2f/lights/' + lightId + '/state',
      method: 'PUT',
      json: true,
      body: {"on": startSet[lightId].state.on, "bri": startSet[lightId].state.bri, "xy": startSet[lightId].state.xy }
    };

    request.put(options, function (error, response, body) {});
  });
  res.send({type: 'sleep', active: false});
};
