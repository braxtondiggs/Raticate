'use strict';

function GridCtrl(scope, rootScope, cfpLoadingBar, _) {
	var vm = this,
		data = rootScope.subData;

	function searchGrid() {
		rootScope.isLoaded = false;
		cfpLoadingBar.start();
		var search = reddit.search('site:youtube.com', _.replace(_.trim(data.sub), '/r/', '')).limit(10).restrict_sr('on');
		if (!_.isUndefined(data.filter.time)) {
			search.t(data.filter.time);
		}
		if (!_.isUndefined(data.filter.sort)) {
			search.sort(data.filter.sort);
		}
		search.fetch(function(res) {
			vm.videos = res.data;
			_.map(vm.videos, function(videos) {
				return _.assign({}, videos, { span: { row: 1, col: 1 } });
			});
			rootScope.isLoaded = true;
			cfpLoadingBar.complete();
			scope.$apply();
		});
	}
	rootScope.$watchGroup(['subData.filter', 'subData.sub'], function() {
		searchGrid();
	});
}

GridCtrl.$inject = ['$scope', '$rootScope', 'cfpLoadingBar', 'lodash'];

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