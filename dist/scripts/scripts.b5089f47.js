"use strict";function GridCtrl(a,b,c,d){function e(){b.isLoaded=!1,c.start();var e=reddit.search("site:youtube.com",d.replace(d.trim(g.sub),"/r/","")).limit(10).restrict_sr("on");d.isUndefined(g.filter.time)||e.t(g.filter.time),d.isUndefined(g.filter.sort)||e.sort(g.filter.sort),e.fetch(function(e){f.videos=e.data,d.map(f.videos,function(a){return d.assign({},a,{span:{row:1,col:1}})}),b.isLoaded=!0,c.complete(),a.$apply()})}var f=this,g=b.subData;b.$watchGroup(["subData.filter","subData.sub"],function(){e()})}function gridDirective(){var a={templateUrl:"./views/directives/grid.html",restrict:"EA",controllerAs:"grid",bindToController:!0,controller:GridCtrl};return a}function SlideShowCtrl(a,b,c,d){function e(c){b.isArray(c)&&(h.trending=b.reject(c,function(a){return!a.data}),h.$storage.trending=c,a.$apply(),f())}function f(){setTimeout(function(){$(".owl-carousel").owlCarousel({loop:!0,margin:10,autoplay:!0,autoplayTimeout:1e4,autoplayHoverPause:!0,nav:!0,navText:['<i class="material-icons">keyboard_arrow_right</i>','<i class="material-icons">keyboard_arrow_left</i>'],responsive:{0:{items:1},1e3:{items:3}}})},50)}function g(a){a.show(a.simple().textContent("Something went very wrong, please try to refresh the page!").position("bottom").hideDelay(3e3))}var h=this;h.$storage=c.$default({trending:[]}),h.loadSub=function(a){console.log("do something"),console.log(a)},b.isEmpty(h.$storage.trending)||!b.isUndefined(h.$storage.trending[0])&&moment(new Date).isAfter(h.$storage.trending[0].date,"day")?reddit.hot("trendingsubreddits").limit(1).fetch(function(a){if(a&&a.data.children[0]&&a.data.children[0]&&a.data.children[0].data&&a.data.children[0].data.title){var c=a.data.children[0].data,f=b.words(c.title,/\/r\/([^,]+)/g),h=[];if(f.length>0){var i=b.map(f,function(a,c){return new Promise(function(e,f){a=b.replace(b.trim(a),"/r/",""),h[c]={},h[c].name=a,h[c].date=new Date,reddit.search("site:youtube.com",a).t("all").sort("hot").restrict_sr("on").fetch(function(a){a&&a.data&&a.data.children?(b.forEach(a.data.children,function(a){if(a&&a.data&&a.data.media&&"youtube.com"===a.data.media.type){var b=a.data,d={author:b.author,created:b.created,media:b.media.oembed,comments:b.num_comments,score:b.score,subreddit:b.subreddit,title:b.title};h[c].data=[],h[c].data.push(d)}}),e(h)):(g(d),f(h))},function(){g(d),f(h)})})});Promise.all(i).then(function(a){e(a[0])},e)}}else g(d)},function(){g(d)}):b.isArray(h.$storage.trending)&&(h.trending=b.reject(h.$storage.trending,function(a){return!a.data}),f())}function slideShowDirective(){var a={templateUrl:"./views/directives/slideshow.html",restrict:"EA",controllerAs:"slide",bindToController:!0,controller:SlideShowCtrl};return a}angular.module("raticateApp",["ngAnimate","ngRoute","ngSanitize","masonry","angular-loading-bar","720kb.fx","ngMaterial","ngLodash","ngStorage","angularMoment","infinite-scroll"]).config(["$routeProvider","$locationProvider","cfpLoadingBarProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/r/:sub/:video",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),c.includeSpinner=!1,b.html5Mode(!0)}]);var ToolbarCtrl=function(a,b,c,d){a.subData={sub:"/r/All",filter:{time:void 0,sort:void 0}};var e=this;e.isSearch=!1,e.search="",e.toggleMenu=function(){c("left").toggle()},e.moreMenu=function(a,b){a(b)},e.filter=function(b,c){a.subData.filter={time:c,sort:b}},e.setSearch=function(){e.isSearch=!e.isSearch,e.isSearch?$('input[type="search"]').focus():(e.searchText="",e.selectedItem=void 0)},e.selectedItemChange=function(b){a.subData.sub=b.url},e.querySearch=function(a){var c=b.defer();return reddit.searchSubreddits(a).limit(10).fetch(function(a){c.resolve(a.data.children)},function(a){c.reject(a)}),c.promise},e.openSearchFromMenu=function(){c("left").close().then(function(){e.setSearch()})},e.openSettings=function(a){d.show({controller:DialogCtrl,templateUrl:"views/dialogs/settings.html",parent:angular.element(document.body),targetEvent:a,openFrom:"#sidenav",clickOutsideToClose:!0})},e.openShare=function(){},e.loadSub=function(b){a.subData.sub=b.name}};ToolbarCtrl.$inject=["$rootScope","$q","$mdSidenav","$mdDialog"],angular.module("raticateApp").controller("ToolbarCtrl",ToolbarCtrl);var MainCtrl=function(a,b,c){a.isLoaded=!1,a.fallback_img="images/logo_transparent.c0ae0fc0.png",a.$storage=b.$default({subs:c})};MainCtrl.$inject=["$rootScope","$localStorage","subs"],angular.module("raticateApp").controller("MainCtrl",MainCtrl),GridCtrl.$inject=["$scope","$rootScope","cfpLoadingBar","lodash"],angular.module("raticateApp").directive("grid",gridDirective),SlideShowCtrl.$inject=["$scope","lodash","$localStorage","$mdToast"],angular.module("raticateApp").directive("slideshow",slideShowDirective),angular.module("raticateApp").constant("subs",[{name:"/r/All",image:null},{name:"/r/ClassicalMusic",image:null},{name:"/r/DeepIntoYoutube",image:null},{name:"/r/FringeDiscussion",image:null},{name:"/r/FullMoviesOnYoutube",image:null},{name:"/r/Games",image:null},{name:"/r/HipHopHeads",image:null},{name:"/r/Jazz",image:null},{name:"/r/KidSafeVideos",image:null},{name:"/r/LearnUselessTalents",image:null},{name:"/r/ListenToThis",image:null},{name:"/r/Music",image:null},{name:"/r/PBS",image:null},{name:"/r/RedditPicks",image:null},{name:"/r/ScienceVideos",image:null},{name:"/r/Sports",image:null},{name:"/r/Television",image:null},{name:"/r/TheNewYorkTimes",image:null},{name:"/r/TodayILearned",image:null},{name:"/r/Videos",image:null},{name:"/r/YoutubeHaiku",image:null}]);var DialogCtrl=function(a){var b=this;b.hide=function(){a.hide()},b.save=function(){}};DialogCtrl.$inject=["$mdDialog"],angular.module("raticateApp").controller("DialogCtrl",DialogCtrl),angular.module("raticateApp").run(["$templateCache",function(a){a.put("views/dialogs/settings.html",'<md-dialog aria-label="Mango (Fruit)" ng-cloak> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Mango (Fruit)</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel()"> <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <h2>Using .md-dialog-content class that sets the padding as the spec</h2> <p> The mango is a juicy stone fruit belonging to the genus Mangifera, consisting of numerous tropical fruiting trees, cultivated mostly for edible fruit. The majority of these species are found in nature as wild mangoes. They all belong to the flowering plant family Anacardiaceae. The mango is native to South and Southeast Asia, from where it has been distributed worldwide to become one of the most cultivated fruits in the tropics. </p> <img style="margin: auto; max-width: 100%" alt="Lush mango tree" src="img/mangues.jpg"> <p> The highest concentration of Mangifera genus is in the western part of Malesia (Sumatra, Java and Borneo) and in Burma and India. While other Mangifera species (e.g. horse mango, M. foetida) are also grown on a more localized basis, Mangifera indica&mdash;the "common mango" or "Indian mango"&mdash;is the only mango tree commonly cultivated in many tropical and subtropical regions. </p> <p> It originated in Indian subcontinent (present day India and Pakistan) and Burma. It is the national fruit of India, Pakistan, and the Philippines, and the national tree of Bangladesh. In several cultures, its fruit and leaves are ritually used as floral decorations at weddings, public celebrations, and religious ceremonies. </p> </div> </md-dialog-content> <md-dialog-actions layout="row"> <md-button href="http://en.wikipedia.org/wiki/Mango" target="_blank" md-autofocus> More on Wikipedia </md-button> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Not Useful </md-button> <md-button ng-click="answer(\'useful\')" style="margin-right:20px"> Useful </md-button> </md-dialog-actions> </form> </md-dialog>'),a.put("views/directives/grid.html",'<h2 id="grid-header">/r/All</h2> <!--<div class="grid" masonry=\'{ "transitionDuration" : "0.4s" , "itemSelector" : ".grid-item", "load-images":"true", "fitWidth": "true"}\'>\n    <div masonry-tile ng-repeat="video in grid.videos.children" class="grid-item" style="width: 150px">\n    	<img ng-src="{{video.data.media.oembed.thumbnail_url}}" class="grid-img"  style="width: 100%"/>\n    	{{video.data.author}}\n    </div>\n</div>--> <div flex ng-cloak> <md-grid-list md-cols-xs="1" md-cols-sm="2" md-cols-md="4" md-cols-gt-md="6" md-row-height-gt-md="1:1" md-row-height="2:2" md-gutter="12px" md-gutter-gt-sm="8px"> <md-grid-tile ng-repeat="video in grid.videos.children" md-rowspan="{{video.span.row}}" md-colspan="{{video.span.col}}" md-colspan-sm="1" md-colspan-xs="1"> <img ng-src="{{video.data.media.oembed.thumbnail_url}}" style="width: 100%"> <md-grid-tile-footer> <h3>{{video.data.author}}</h3> </md-grid-tile-footer> </md-grid-tile> </md-grid-list> </div>'),a.put("views/directives/slideshow.html",'<h2 id="trend-header">What\'s Trending</h2> <div class="owl-carousel owl-theme"> <div class="item" ng-repeat="item in slide.trending track by $index" ng-click="slide.loadSub(item)"> <img ng-src="{{item.data[0].media.thumbnail_url}}" alt=""> </div> </div>'),a.put("views/main.html","<slideshow></slideshow> <grid></grid>")}]);