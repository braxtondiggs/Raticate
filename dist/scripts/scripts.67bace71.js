"use strict";function GridCtrl(a,b,c){var d=this;b.isLoaded=!1,c.start(),reddit.search("site:youtube.com","videos").t("all").limit(10).restrict_sr("on").fetch(function(e){d.videos=e.data,console.log(d.videos),b.isLoaded=!0,c.complete(),a.$apply()})}function gridDirective(){var a={templateUrl:"./views/directives/grid.html",restrict:"EA",controllerAs:"grid",bindToController:!0,controller:GridCtrl,link:function(a,b,c){console.log(c)}};return a}function SlideShowCtrl(a,b,c,d){function e(c){b.isArray(c)&&(h.trending=b.reject(c,function(a){return!a.data}),h.$storage.trending=c,a.$apply(),f())}function f(){setTimeout(function(){$(".owl-carousel").owlCarousel({loop:!0,margin:10,autoplay:!0,autoplayTimeout:1e4,autoplayHoverPause:!0,nav:!0,navText:['<i class="material-icons">keyboard_arrow_right</i>','<i class="material-icons">keyboard_arrow_left</i>'],responsive:{0:{items:1},1e3:{items:3}}})},50)}function g(a){a.show(a.simple().textContent("Something went very wrong, please try to refresh the page!").position("bottom").hideDelay(3e3))}var h=this;h.$storage=c.$default({trending:[]}),h.loadSub=function(a){console.log("do something"),console.log(a)},b.isEmpty(h.$storage.trending)||!b.isUndefined(h.$storage.trending[0])&&moment(new Date).isAfter(h.$storage.trending[0].date,"day")?reddit.hot("trendingsubreddits").limit(1).fetch(function(a){if(a&&a.data.children[0]&&a.data.children[0]&&a.data.children[0].data&&a.data.children[0].data.title){var c=a.data.children[0].data,f=b.words(c.title,/\/r\/([^,]+)/g),h=[];if(f.length>0){var i=b.map(f,function(a,c){return new Promise(function(e,f){a=b.replace(b.trim(a),"/r/",""),h[c]={},h[c].name=a,h[c].date=new Date,reddit.search("site:youtube.com",a).t("all").sort("hot").restrict_sr("on").fetch(function(a){a&&a.data&&a.data.children?(b.forEach(a.data.children,function(a){if(a&&a.data&&a.data.media&&"youtube.com"===a.data.media.type){var b=a.data,d={author:b.author,created:b.created,media:b.media.oembed,comments:b.num_comments,score:b.score,subreddit:b.subreddit,title:b.title};h[c].data=[],h[c].data.push(d)}}),e(h)):(g(d),f(h))},function(){g(d),f(h)})})});Promise.all(i).then(function(a){e(a[0])},e)}}else g(d)},function(){g(d)}):b.isArray(h.$storage.trending)&&(h.trending=b.reject(h.$storage.trending,function(a){return!a.data}),console.log(h.trending),f())}function slideShowDirective(){var a={templateUrl:"./views/directives/slideshow.html",restrict:"EA",controllerAs:"slide",bindToController:!0,controller:SlideShowCtrl};return a}angular.module("raticateApp",["ngAnimate","ngRoute","ngSanitize","masonry","angular-loading-bar","720kb.fx","ngMaterial","ngLodash","ngStorage","angularMoment"]).config(["$routeProvider","cfpLoadingBarProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/r/:sub/:video",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),b.includeSpinner=!1}]);var ToolbarCtrl=function(a,b){var c=this;c.isSearch=!1,c.search="",c.toggleMenu=function(){b("left").toggle()},c.moreMenu=function(a,b){a(b)},c.setSearch=function(){c.isSearch=!c.isSearch,c.isSearch?$('input[type="search"]').focus():(c.searchText="",c.selectedItem=void 0)},c.selectedItemChange=function(a){console.log(a)},c.querySearch=function(b){var c=a.defer();return reddit.searchSubreddits(b).limit(10).fetch(function(a){c.resolve(a.data.children)},function(a){c.reject(a)}),c.promise}};ToolbarCtrl.$inject=["$q","$mdSidenav"],angular.module("raticateApp").controller("ToolbarCtrl",ToolbarCtrl);var MainCtrl=function(a){a.isLoaded=!1};MainCtrl.$inject=["$rootScope"],angular.module("raticateApp").controller("MainCtrl",MainCtrl),GridCtrl.$inject=["$scope","$rootScope","cfpLoadingBar"],angular.module("raticateApp").directive("grid",gridDirective),SlideShowCtrl.$inject=["$scope","lodash","$localStorage","$mdToast"],angular.module("raticateApp").directive("slideshow",slideShowDirective),angular.module("raticateApp").run(["$templateCache",function(a){a.put("views/directives/grid.html",'<h2 id="grid-header">/r/All</h2> <div class="grid" masonry="{ &quot;transitionDuration&quot; : &quot;0.4s&quot; , &quot;itemSelector&quot; : &quot;.grid-item&quot;, &quot;columnWidth&quot;: &quot;.grid-item&quot;}"> <div masonry-tile ng-repeat="video in grid.videos.children" class="grid-item" style="width: 150px"> <!--ng-style="{width: vm.size()+\'%\'}">--> <img src="{{video.data.media.oembed.thumbnail_url}}" class="grid-img" style="width: 100%"> {{video.data.author}} </div> </div>'),a.put("views/directives/slideshow.html",'<h2 id="trend-header">What\'s Trending</h2> <div class="owl-carousel owl-theme"> <div class="item" ng-repeat="item in slide.trending track by $index" ng-click="slide.loadSub(item)"> <img src="{{item.data[0].media.thumbnail_url}}"> </div> </div>'),a.put("views/main.html","<slideshow></slideshow> <grid></grid>")}]);