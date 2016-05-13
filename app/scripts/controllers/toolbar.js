'use strict';
var ToolbarCtrl = function($q, $mdSidenav) {
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
		console.log(t);
		console.log(sort);
	};
	vm.setSearch = function() {
		vm.isSearch = (vm.isSearch) ? false : true;
		if (!vm.isSearch) {
			vm.searchText = '';
			vm.selectedItem = undefined;
		}else {
			$('input[type="search"]').focus();
		}
	};
	vm.selectedItemChange = function(item) {
		console.log(item);//TODO goto location
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
};
angular.module('raticateApp').controller('ToolbarCtrl', ToolbarCtrl);