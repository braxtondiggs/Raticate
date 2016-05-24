'use strict';

function SlideShowCtrl(scope, _, $localStorage, $mdToast) {
	function callback(t) {
		if (_.isArray(t)) {
			vm.trending = _.reject(t, function(o) {
				return !o.data;
			});
			vm.$storage.trending = t;
			scope.$apply();
			initSlide();
		}
	}

	function initSlide() {
		setTimeout(function() {
			$('.owl-carousel').owlCarousel({
				margin: 10,
				autoplay: true,
				autoplayTimeout: 10000,
				autoplayHoverPause: true,
				nav: true,
				navText: ['<i class="material-icons">keyboard_arrow_right</i>', '<i class="material-icons">keyboard_arrow_left</i>'],
				responsive: {
					0: {
						items: 1
					},
					1000: {
						items: 3
					}
				}
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
	var vm = this;

	vm.$storage = $localStorage.$default({
		trending: []
	});
	vm.loadSub = function(trend) {
		console.log('do something');
		console.log(trend);
	};
	if (_.isEmpty(vm.$storage.trending) || (!_.isUndefined(vm.$storage.trending[0]) && moment(new Date()).isAfter(vm.$storage.trending[0].date, 'day'))) {
		reddit.hot('trendingsubreddits').limit(1).fetch(function(response) {
			if (response && response.data.children[0] && response.data.children[0] && response.data.children[0].data && response.data.children[0].data.title) {
				var data = response.data.children[0].data,
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
							}, function() {
								systemError($mdToast);
								reject(trending);
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
		}, function() {
			systemError($mdToast);
		});
	} else {
		if (_.isArray(vm.$storage.trending)) {
			vm.trending = _.reject(vm.$storage.trending, function(o) {
				return !o.data;
			});
			initSlide();
		}
	}
}

SlideShowCtrl.$inject = ['$scope', 'lodash', '$localStorage', '$mdToast'];

function slideShowDirective() {
	var directive = {
		templateUrl: 'views/directives/slideshow.html',
		restrict: 'EA',
		controllerAs: 'slide',
		bindToController: true,
		controller: SlideShowCtrl
	};
	return directive;
}

angular.module('raticateApp').directive('slideshow', slideShowDirective);