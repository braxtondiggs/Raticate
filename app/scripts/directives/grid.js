'use strict';

function GridCtrl(rootScope, cfpLoadingBar, _, UtilsService, $mdToast) {
	var vm = this,
		data = rootScope.subData;

	function systemError($mdToast) {
		$mdToast.show(
			$mdToast.simple()
			.textContent('Something went very wrong, please try to refresh the page!')
			.position('bottom')
			.hideDelay(3000)
		);
	}

	function searchGrid() {
		rootScope.isLoaded = false;
		cfpLoadingBar.start();
		var search = reddit.search('site:youtube.com', UtilsService.cleanUrl(data.sub)).limit(10).restrict_sr('on');
		if (!_.isUndefined(data.filter.time)) {
			search.t(data.filter.time);
		}
		if (!_.isUndefined(data.filter.sort)) {
			search.sort(data.filter.sort);
		}
		if (!_.isUndefined(vm.videos)) {
			search.after(vm.videos.after);
		}
		search.fetch(function(res) {
			if (!_.isUndefined(vm.videos)) {
				if (!_.isUndefined(res.data.children)) {
					vm.videos.after = res.data.after;
					vm.videos.children = _.concat(vm.videos.children, res.data.children);
				}
			} else {
				vm.videos = res.data;
			}
			vm.videos.children = _(vm.videos.children).forEach(function(val) {
				val.span = { row: 2, col: 2 };
				return val;
			});
			setTimeout(function() {
				rootScope.isLoaded = true;
				vm.isBusy = false;
				cfpLoadingBar.complete();
			}, 750);
		}, function() {
			systemError($mdToast);
			vm.isBusy = false;
		});
	}
	rootScope.$watchGroup(['subData.filter', 'subData.sub'], function() {
		vm.videos = undefined;
		searchGrid();
	});
	vm.loadMore = function() {
		if (!vm.isBusy) {
			vm.isBusy = true;
			searchGrid();
		}
	};
}

GridCtrl.$inject = ['$rootScope', 'cfpLoadingBar', 'lodash', 'UtilsService', '$mdToast'];

function gridDirective() {
	var directive = {
		templateUrl: './views/directives/grid.html',
		restrict: 'EA',
		controllerAs: 'grid',
		bindToController: true,
		controller: GridCtrl
	};
	return directive;
}

angular.module('raticateApp').directive('grid', gridDirective);