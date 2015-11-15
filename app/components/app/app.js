'use strict';


var app = angular.module('charaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
]);


app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
