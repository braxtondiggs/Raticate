'use strict';
angular
  .module('raticateApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'masonry',
    'angular-loading-bar',
    '720kb.fx',
    'ngMaterial',
    'ngLodash',
    'ngStorage',
    'angularMoment',
    'infinite-scroll'
  ])
  .config(function($routeProvider, cfpLoadingBarProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/r/:sub', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/r/:sub/:video', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
      cfpLoadingBarProvider.includeSpinner = false;
  });