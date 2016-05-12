'use strict';

function initSlide() {
	setTimeout(function() {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 3
				},
				1000: {
					items: 5
				}
			}
		});
	}, 50);
}

function SlideShowCtrl(scope, el, attr, ctrl) {
	var vm = this;
	reddit.search('site:youtube.com', 'videos').t('all').limit(10).fetch(function(res) {
		vm.videos = res.data;
		scope.$apply();
	});
	vm.items = ['item1', 'item2'];
	initSlide();
}

SlideShowCtrl.$inject = ['$scope'];

function slideShowDirective() {
	var directive = {
		templateUrl: './views/directives/slideshow.html',
		restrict: 'EA',
		controllerAs: 'vm',
		bindToController: true,
		controller: SlideShowCtrl,
		link: function postLink(scope, element, attrs) {
			//element.text('this is the grid directive');

		}
	};
	return directive;
}

angular.module('raticateApp').directive('slideshow', slideShowDirective);