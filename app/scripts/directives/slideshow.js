'use strict';

function initSlide() {
	setTimeout(function() {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true
		});
	}, 50);
}

function systemError($mdToast) {
	$mdToast.show(
		$mdToast.simple()
		.textContent('Something went very wrong, please try to refresh the page!')
		.position('bottom')
		.hideDelay(3000)
	);
}

function SlideShowCtrl(scope, $http, _, $localStorage, $mdToast) {
	function callback(t) {
		vm.trending = t;
		vm.$storage.trending = t;
		scope.$apply();
		initSlide();
	}
	var vm = this;

	vm.$storage = $localStorage.$default({
		trending: []
	});
	if (_.isEmpty(vm.$storage.trending) || (!_.isUndefined(vm.$storage.trending[0]) && moment(new Date()).isAfter(vm.$storage.trending[0].date, 'day'))) {
		$http({
			method: 'GET',
			url: 'https://www.reddit.com/r/trendingsubreddits.json?limit=1'
		}).then(function successCallback(response) {
				if (response && response.data && response.data.data && response.data.data.children[0] && response.data.data.children[0].data && response.data.data.children[0].data.title) {
					var data = response.data.data.children[0].data,
						subs = _.words(data.title, /\/r\/([^,]+)/g),
						trending = [];
					if (subs.length > 0) {
						var promises = _.map(subs, function(sub, i) {
							return new Promise(function(resolve, reject) {
								sub = _.replace(_.trim(sub), '/r/', '');
								trending[i] = {};
								trending[i].name = sub;
								trending[i].date = new Date();
								reddit.search('site:youtube.com', sub).t('all').sort('hot').restrict_sr('on').fetch(function(res) {
									if (res && res.data && res.data.children) {
										_.forEach(res.data.children, function(post) {
											if (post && post.data && post.data.media && post.data.media.type === 'youtube.com') {
												var info = post.data,
													obj = {
														author: info.author,
														created: info.created,
														media: info.media.oembed,
														comments: info.num_comments,
														score: info.score,
														subreddit: info.subreddit,
														title: info.title
													};
												trending[i].data = [];
												trending[i].data.push(obj);
											}
										});
										resolve(trending);
									} else {
										systemError($mdToast);
										reject(trending);
									}
								});
							});
						});

						Promise.all(promises).then(function(trend) {
							callback(trend[0]);
						}, callback);
					}
				} else {
					systemError($mdToast);
				}
			},
			function errorCallback() {
				systemError($mdToast);
			});
	} else {
		vm.trending = vm.$storage.trending;
		console.log(vm);
		initSlide();
	}
}

SlideShowCtrl.$inject = ['$scope', '$http', 'lodash', '$localStorage', '$mdToast'];

function slideShowDirective() {
	var directive = {
		templateUrl: './views/directives/slideshow.html',
		restrict: 'EA',
		controllerAs: 'slide',
		bindToController: true,
		controller: SlideShowCtrl
	};
	return directive;
}

angular.module('raticateApp').directive('slideshow', slideShowDirective);