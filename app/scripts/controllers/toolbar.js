'use strict';
var ToolbarCtrl = function($scope, $rootScope, $q, $mdSidenav, $mdDialog, UtilsService, cfpLoadingBar, lodash, $location) {
	/*global DialogCtrl*/
	var vm = this;
	vm.isSearch = false;
	vm.search = '';
	vm.toggleMenu = function() {
		$mdSidenav('left').toggle();
	};
	vm.moreMenu = function($mdOpenMenu, ev) {
		$mdOpenMenu(ev);
	};
	vm.filter = function(sort, t) {
		$location.search('t', t);
		$location.search('sort', sort);
	};
	vm.setSearch = function() {
		vm.isSearch = (vm.isSearch) ? false : true;
		if (!vm.isSearch) {
			vm.searchText = '';
			vm.selectedItem = undefined;
		} else {
			$('input[type="search"]').focus();
		}
	};
	vm.selectedItemChange = function(item) {
		if (item) {
			$mdSidenav('left').close().then(function() {
				$location.path(item.url);
			});
		}
	};
	vm.querySearch = function(query) {
		var deferred = $q.defer();
		reddit.searchSubreddits(query).limit(10).fetch(function(res) {
			deferred.resolve(res.data.children);
		}, function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};
	vm.openSearchFromMenu = function() {
		$mdSidenav('left').close().then(function() {
			vm.setSearch();
		});
	};
	vm.openSettings = function(ev) {
		$mdDialog.show({
			controller: DialogCtrl,
			templateUrl: 'views/dialogs/settings.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			preserveScope: true,
			controllerAs: 'dialog',
			bindToController: true,
			locals: {
				settings: $rootScope.$storage.settings
			}
		});
	};
	vm.openShare = function() {
		//TODO
	};
	vm.loadSub = function(item) {
		$mdSidenav('left').close().then(function() {
			$location.path(item.name);
		});
	};
	vm.infoSub = function(item, ev) {
		cfpLoadingBar.start();
		reddit.about(UtilsService.cleanUrl(item.name)).fetch(function(res) {
			$mdDialog.show({
				controller: DialogCtrl,
				templateUrl: 'views/dialogs/info.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				controllerAs: 'dialog',
				preserveScope: true,
				bindToController: true,
				locals: {
					data: res.data
				}
			}).then(function() {
				cfpLoadingBar.complete();
			});
		});
	};
	vm.deleteSub = function(item, ev) {
		$mdDialog.show(
			$mdDialog.confirm()
			.parent(angular.element(document.body))
			.clickOutsideToClose(true)
			.title('Delete Sub-Reddit')
			.textContent('Are you sure you want remove this subreddit: ' + item.name + ' from showing?')
			.ok('Delete!')
			.cancel('Cancel')
			.targetEvent(ev)
		).then(function() {
			$rootScope.$storage.subs = lodash.filter($rootScope.$storage.subs, function(o) {
				return item.name !== o.name;
			});
			$mdDialog.hide();
		});
	};
};
angular.module('raticateApp').controller('ToolbarCtrl', ToolbarCtrl);
