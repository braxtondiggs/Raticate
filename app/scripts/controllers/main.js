'use strict';
var MainCtrl = function($rootScope) {
	$rootScope.isLoaded = false;
};
angular.module('raticateApp').controller('MainCtrl', MainCtrl);