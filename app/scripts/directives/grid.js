'use strict';

function GridCtrl(scope, rootScope, cfpLoadingBar) {
	var vm = this;
	rootScope.isLoaded = false;
	cfpLoadingBar.start();
	reddit.search('site:youtube.com', 'videos').t('all').limit(10).restrict_sr('on').fetch(function(res) {
		vm.videos = res.data;
		console.log(vm.videos);
		rootScope.isLoaded = true;
		cfpLoadingBar.complete();
		scope.$apply();
	});
}

GridCtrl.$inject = ['$scope', '$rootScope', 'cfpLoadingBar'];

function gridDirective() {
	var directive = {
		templateUrl: './views/directives/grid.html',
		restrict: 'EA',
		controllerAs: 'grid',
		bindToController: true,
		controller: GridCtrl,
		link: function postLink(scope, element, attrs) {
			//element.text('this is the grid directive');
			console.log(attrs);
		}
	};
	return directive;
}

angular.module('raticateApp').directive('grid', gridDirective);