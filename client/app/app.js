'use strict';


var app = angular.module('charaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angular-gestures'
]);


app.config(function ($stateProvider, $urlRouterProvider, $locationProvider,  hammerDefaultOptsProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  });
