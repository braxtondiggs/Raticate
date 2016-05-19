'use strict';

function UtilsService(_) {
	var _this = this;
	_this.cleanUrl = function(url) {
		return _.replace(_.replace(_.trim(url), '/r/', ''), '/', '');
	};
}

UtilsService.$inject = ['lodash'];

angular.module('raticateApp').service('UtilsService', UtilsService);