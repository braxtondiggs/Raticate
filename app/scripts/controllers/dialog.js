'use strict';
var DialogCtrl = function($mdDialog, $sce, lodash) {
	var vm = this;
	vm.close = function() {
		$mdDialog.hide();
	};
	vm.html = function(html) {
		return $sce.trustAsHtml(lodash.unescape(html));
	};
};
angular.module('raticateApp').controller('DialogCtrl', DialogCtrl);