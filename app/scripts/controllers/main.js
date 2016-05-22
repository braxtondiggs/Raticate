'use strict';
var MainCtrl = function($rootScope, $localStorage, subs, $routeParams) {
	$rootScope.isLoaded = false;
	$rootScope.fallback_img = 'images/logo_transparent.png';
	$rootScope.$storage = $localStorage.$default({
		subs: subs,
		settings: {
			autoplay: true
		}
	});
	$rootScope.subData = {
		sub: $routeParams.sub || '/r/All',
		filter: {
			time: $routeParams.t || 'hour',
			sort: $routeParams.sort || 'hot'
		}
	};
};
angular.module('raticateApp').controller('MainCtrl', MainCtrl);