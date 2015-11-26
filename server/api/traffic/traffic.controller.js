'use strict';

var _ = require('lodash');
var request = require('request');
var http = require('http');

var apiKeys = {
  place: '1900408b71e94b1d9fc075e7d4f3efe1',
  realtime: '3d88771f23864f93ae7d3244e53fea14',
  stops: '594911d9-39e6-40c6-b0fc-5ff289bf6b1b',
  nearby: '20f1c1c59bb9410b8c945fe95365148a'
};

// Get list of traffics
exports.index = function(req, res) {

  http.get({
    host: 'api.sl.se',
    path: '/api2/typeahead.json?key=' + apiKeys.place + '&searchstring=' + req.body.station + '&stationsonly=' + req.body.stationsOnly  + '&maxresults=' + req.body.maxResults,
  }, function (response) {
    var buffer = "",
    data,
    route;

    response.on("data", function (chunk) {
      buffer += chunk;
    });

    response.on("end", function (err) {
      if (buffer){
        try{
          data = JSON.parse(buffer);
          res.send(data);
        }catch(e){
          console.error(e); //error in the above string(in this case,yes)!
        }
      }
    });
  });
};

exports.lookup = function(req, res) {
  http.get({
    host: 'api.sl.se',
    path: '/api2/realtimedepartures.json?key=' + apiKeys.realtime + '&siteid=' + req.body.siteId + '&timewindow=60',
  }, function (response) {
    var buffer = "",
    data,
    route;

    response.on("data", function (chunk) {
      buffer += chunk;
    });

    response.on("end", function (err) {
      if (buffer){
        try{
          data = JSON.parse(buffer);
          res.send(data);
        }catch(e){
          console.error(e); //error in the above string(in this case,yes)!
        }
      }
    });
  });
};
