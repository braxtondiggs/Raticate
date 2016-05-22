'use strict';

function UtilsService(_) {
	var _this = this;
	_this.cleanUrl = function(url) {
		return _.replace(_.replace(_.trim(url), '/r/', ''), '/', '');
	};
	_this.ytParse = function(url) {
		var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		return (match && match[2].length === 11) ? match[2] : false;
	};
}

UtilsService.$inject = ['lodash'];

angular.module('raticateApp').service('UtilsService', UtilsService);