'use strict';
var ToolbarCtrl = function($mdSidenav) {
	var vm = this;
	vm.isSearch = false;
	vm.search = '';
	vm.toggleMenu = function() {
		$mdSidenav('left').toggle();
	};
	vm.moreMenu = function($mdOpenMenu, ev) {
		$mdOpenMenu(ev);
	};
	vm.setSearch = function() {
		vm.isSearch = (vm.isSearch) ? false : true;
	};
};
angular.module('raticateApp').controller('ToolbarCtrl', ToolbarCtrl);