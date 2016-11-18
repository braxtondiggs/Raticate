'use strict';
/*global polygon*/
function GridCtrl(rootScope, cfpLoadingBar, _, UtilsService, $mdToast, $mdDialog, $sce, $timeout, utils, $routeParams) {
	var vm = this,
		data = rootScope.subData,
		maxLimit = 5,
    last_changed;
	vm.loadCount = 0;

	function systemError($mdToast) {
		$mdToast.show(
			$mdToast.simple()
			.textContent('Something went very wrong, please try to refresh the page!')
			.position('bottom')
			.hideDelay(3000)
		);
	}

	function dismissLoading() {
    rootScope.isLoaded = true;
		vm.isBusy = false;
		cfpLoadingBar.complete();
		polygon.init();
	}

	function searchGrid() {
		if (vm.loadCount < maxLimit) {
			rootScope.isLoaded = false;
			vm.loadCount++;
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
				if (!_.isEmpty(res.data.children)) {
					if (!_.isUndefined(vm.videos)) {
						if (!_.isUndefined(res.data.children)) {
							vm.videos.after = res.data.after;
							vm.videos.children = _.concat(vm.videos.children, res.data.children);
						}
					} else {
						vm.videos = res.data;
					}
					vm.loadCount = 0;
					vm.videos.children = _(vm.videos.children).forEach(function(val) {
						val.span = { row: 2, col: 2 };
						val.data.created = moment(new Date(val.data.created * 1000)).fromNow();
						return val;
					});
				}
				if(_.isUndefined(vm.videos) || _.isEmpty(vm.videos.children)) {
					searchGrid();
				}else {
          $timeout(function() {
            dismissLoading();
          }, 750);
				}
			}, function() {
				systemError($mdToast);
				vm.isBusy = false;
			});
		} else {
			if(_.isUndefined(vm.videos) || _.isEmpty(vm.videos.children)) {
        if (last_changed === $routeParams.sub) {
          dismissLoading();
  				$mdDialog.show(
  					$mdDialog.alert()
  						.clickOutsideToClose(true)
  						.title('RedditTV')
  						.htmlContent('Doesn\'t look like we could find any videos in <b>' + UtilsService.cleanUrl(data.sub) + '</b>, <br />try using a diffrent sub reddit.')
  						.ok('Ok')
  				);
        }
			}
		}
	}
	rootScope.$watchGroup(['subData.filter', 'subData.sub'], function(newVal, oldVal) {
    last_changed = oldVal[1];
    vm.videos = undefined;
		searchGrid();
	});
	vm.loadMore = function() {
		if (!vm.isBusy && vm.loadCount < maxLimit) {
			vm.isBusy = true;
			searchGrid();
		}
	};
	vm.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
	vm.loadVideo = function(item) {
		function onPlayerReady() {
		}
		function onPlayerStateChange() {
		}
		var player = new YT.Player('player_' + item.id, {
			height: '390',
			width: '640',
			videoId: utils.ytParse(item.url),
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	};
}

GridCtrl.$inject = ['$rootScope', 'cfpLoadingBar', 'lodash', 'UtilsService', '$mdToast', '$mdDialog', '$sce', '$timeout', 'UtilsService', '$routeParams'];

function gridDirective() {
	var directive = {
		templateUrl: 'views/directives/grid.html',
		restrict: 'EA',
		controllerAs: 'grid',
		bindToController: true,
		controller: GridCtrl
	};
	return directive;
}

angular.module('raticateApp').directive('grid', gridDirective);
