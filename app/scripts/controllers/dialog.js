'use strict';
var DialogCtrl = function($mdDialog) {
	var vm = this;
	vm.hide = function() {
		$mdDialog.hide();
	};
	vm.save = function() {

	};
};
angular.module('raticateApp').controller('DialogCtrl', DialogCtrl);