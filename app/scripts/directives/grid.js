'use strict';

function GridCtrl(scope, rootScope, cfpLoadingBar, el, attr, ctrl) {
	var vm = this;
	rootScope.isLoaded = false;
	cfpLoadingBar.start();
	reddit.search('site:youtube.com', 'videos').t('all').limit(10).fetch(function(res) {
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
		controllerAs: 'vm',
		bindToController: true,
		controller: GridCtrl,
		link: function postLink(scope, element, attrs) {
			//element.text('this is the grid directive');

		}
	};
	return directive;
}

angular.module('raticateApp').directive('grid', gridDirective);