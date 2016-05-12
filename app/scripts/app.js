'use strict';
angular
  .module('raticateApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'masonry',
    'angular-loading-bar',
    '720kb.fx',
    'ngMaterial'
  ])
  .config(function($routeProvider, cfpLoadingBarProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
      cfpLoadingBarProvider.includeSpinner = false;
  });