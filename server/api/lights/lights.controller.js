'use strict';

var _ = require('lodash');
var http = require('http');
var request = require('request');

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
  var options = {
    uri: 'http://192.168.2.3/api/1593afc71aba483f67bb1b73f41cc2f/lights/'+(req.body.id)+'/state',
    method: 'PUT',
    json: true,
    body: {"on": req.body.state.on, "bri": 254, "xy": [0.4575,0.4101] }
  };

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function() {
      console.log(str);
    });
  };


  request.put(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send({'on': req.body.state.on});
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
      dimLights();
      setTimeout(function(){
        shutdownLights();
      }, 300000);
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
