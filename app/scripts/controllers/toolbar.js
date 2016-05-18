'use strict';
var ToolbarCtrl = function($rootScope, $q, $mdSidenav, $mdDialog) {
	$rootScope.subData = {
		sub: '/r/All',
		filter: {
			time: undefined,
			sort: undefined
		}
	};
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
		$rootScope.subData.filter = { time: t, sort: sort };
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
		$rootScope.subData.sub = item.url;
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
		/*global DialogCtrl*/
		$mdDialog.show({
			controller: DialogCtrl,
			templateUrl: 'views/dialogs/settings.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			openFrom: '#sidenav',
			clickOutsideToClose: true
		});
	};
	vm.openShare = function() {
		//TODO
	};
	vm.loadSub = function(item) {
		$rootScope.subData.sub = item.name;
	};
};
angular.module('raticateApp').controller('ToolbarCtrl', ToolbarCtrl);