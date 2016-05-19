'use strict';
var MainCtrl = function($rootScope, $localStorage, subs) {
	//var vm = this;
	$rootScope.isLoaded = false;
	$rootScope.fallback_img = 'images/logo_transparent.png';
	$rootScope.$storage = $localStorage.$default({
		subs: subs,
		settings: {
			autoplay: true
		}
	});
};
angular.module('raticateApp').controller('MainCtrl', MainCtrl);