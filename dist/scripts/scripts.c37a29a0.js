"use strict";function GridCtrl(a,b,c,d,e,f,g,h,i,j){function k(a){a.show(a.simple().textContent("Something went very wrong, please try to refresh the page!").position("bottom").hideDelay(3e3))}function l(){a.isLoaded=!0,o.isBusy=!1,b.complete(),polygon.init()}function m(){if(o.loadCount<q){a.isLoaded=!1,o.loadCount++,b.start();var g=reddit.search("site:youtube.com",d.cleanUrl(p.sub)).limit(10).restrict_sr("on");c.isUndefined(p.filter.time)||g.t(p.filter.time),c.isUndefined(p.filter.sort)||g.sort(p.filter.sort),c.isUndefined(o.videos)||g.after(o.videos.after),g.fetch(function(a){c.isEmpty(a.data.children)||(c.isUndefined(o.videos)?o.videos=a.data:c.isUndefined(a.data.children)||(o.videos.after=a.data.after,o.videos.children=c.concat(o.videos.children,a.data.children)),o.loadCount=0,o.videos.children=c(o.videos.children).forEach(function(a){return a.span={row:2,col:2},a.data.created=moment(new Date(1e3*a.data.created)).fromNow(),a})),c.isUndefined(o.videos)||c.isEmpty(o.videos.children)?m():h(function(){l()},750)},function(){k(e),o.isBusy=!1})}else(c.isUndefined(o.videos)||c.isEmpty(o.videos.children))&&n===j.sub&&(l(),f.show(f.alert().clickOutsideToClose(!0).title("RedditTV").htmlContent("Doesn't look like we could find any videos in <b>"+d.cleanUrl(p.sub)+"</b>, <br />try using a diffrent sub reddit.").ok("Ok")))}var n,o=this,p=a.subData,q=5;o.loadCount=0,a.$watchGroup(["subData.filter","subData.sub"],function(a,b){n=b[1],o.videos=void 0,m()}),o.loadMore=function(){!o.isBusy&&o.loadCount<q&&(o.isBusy=!0,m())},o.trustSrc=function(a){return g.trustAsResourceUrl(a)},o.loadVideo=function(a){function b(){}function c(){}new YT.Player("player_"+a.id,{height:"390",width:"640",videoId:i.ytParse(a.url),events:{onReady:b,onStateChange:c}})}}function gridDirective(){var a={templateUrl:"views/directives/grid.html",restrict:"EA",controllerAs:"grid",bindToController:!0,controller:GridCtrl};return a}function SlideShowCtrl(a,b,c,d,e){function f(c){b.isArray(c)&&(i.trending=b.reject(c,function(a){return!a.data}),i.$storage.trending=c,a.$apply(),g())}function g(){setTimeout(function(){$(".owl-carousel").owlCarousel({margin:10,autoplay:!0,autoplayTimeout:1e4,autoplayHoverPause:!0,nav:!0,pagination:!1,navText:['<i class="material-icons">keyboard_arrow_right</i>','<i class="material-icons">keyboard_arrow_left</i>'],responsive:{0:{items:1},1e3:{items:3}}})},50)}function h(a){a.show(a.simple().textContent("Something went very wrong, please try to refresh the page!").position("bottom").hideDelay(3e3))}var i=this;i.$storage=d.$default({trending:[]}),i.loadSub=function(a){c.path("r/"+a.name)},b.isEmpty(i.$storage.trending)||!b.isUndefined(i.$storage.trending[0])&&moment(new Date).isAfter(i.$storage.trending[0].date,"day")?reddit.hot("trendingsubreddits").limit(1).fetch(function(a){if(a&&a.data.children[0]&&a.data.children[0]&&a.data.children[0].data&&a.data.children[0].data.title){var c=a.data.children[0].data,d=b.words(c.title,/\/r\/([^,]+)/g),g=[];if(d.length>0){var i=b.map(d,function(a,c){return new Promise(function(d,f){a=b.replace(b.trim(a),"/r/",""),g[c]={},g[c].name=a,g[c].date=new Date,reddit.search("site:youtube.com",a).t("all").sort("hot").restrict_sr("on").fetch(function(a){a&&a.data&&a.data.children?(b.forEach(a.data.children,function(a){if(a&&a.data&&a.data.media&&"youtube.com"===a.data.media.type){var b=a.data,d={author:b.author,created:b.created,media:b.media.oembed,comments:b.num_comments,score:b.score,subreddit:b.subreddit,title:b.title};g[c].data=[],g[c].data.push(d)}}),d(g)):(h(e),f(g))},function(){h(e),f(g)})})});Promise.all(i).then(function(a){f(a[0])},f)}}else h(e)},function(){h(e)}):b.isArray(i.$storage.trending)&&(i.trending=b.reject(i.$storage.trending,function(a){return!a.data}),g())}function slideShowDirective(){var a={templateUrl:"views/directives/slideshow.html",restrict:"EA",controllerAs:"slide",bindToController:!0,controller:SlideShowCtrl};return a}function UtilsService(a){var b=this;b.cleanUrl=function(b){return a.replace(a.replace(a.trim(b),"/r/",""),"/","")},b.ytParse=function(a){var b=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,c=a.match(b);return!(!c||11!==c[2].length)&&c[2]}}angular.module("raticateApp",["ngAnimate","ngRoute","ngSanitize","masonry","angular-loading-bar","720kb.fx","ngMaterial","ngLodash","ngStorage","angularMoment","infinite-scroll"]).config(["$routeProvider","cfpLoadingBarProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/r/:sub",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/r/:sub/:video",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),b.includeSpinner=!1}]);var Card=function(a,b){function c(a,b){this.id=a,this._el=b,this._container=$(this._el).find(d.container)[0],this._clip=$(this._el).find(d.clip)[0],this._content=$(this._el).find(d.content)[0],this.isOpen=!1,this._TL=null}var d={container:".card__container",content:".card__content",clip:".clip"},e={containerClosed:"card__container--closed",bodyHidden:"body--hidden"};return c.prototype.openCard=function(a){this._TL=new TimelineLite;var b=this,c=this._slideContentDown(),d=this._clipImageIn(),e=this._floatContainer(a),f=this._clipImageOut(),g=this._slideContentUp();return this._TL.add(c),this._TL.add(d,0),this._TL.add(e,"-="+.6*d.duration()),this._TL.add(f,"-="+.3*e.duration()),this._TL.add(g,"-="+.6*f.duration()),setTimeout(function(){$(b._el).find(".card__video").fadeIn("slow")},3e3),this.isOpen=!0,this._TL},c.prototype._slideContentDown=function(){var b=TweenLite.to(this._content,.8,{y:a.innerHeight,ease:Expo.easeInOut});return b},c.prototype._clipImageIn=function(){var a=new TimelineLite,b=[[0,500],[0,0],[1920,0],[1920,500]],c=[[1025,330],[1117,171],[828,206],[913,260]],d=[];return b.forEach(function(b,e){var f=TweenLite.to(b,1.5,c[e]);c[e].onUpdate=function(){d.push(b.join()),d.length===c.length&&($(this._clip).attr("points",d.join(" ")),d=[])}.bind(this),f.vars.ease=Expo.easeInOut,a.add(f,0)},this),a},c.prototype._floatContainer=function(b){$(document.body).addClass(e.bodyHidden);var c=new TimelineLite,d=this._container.getBoundingClientRect(),f=a.innerWidth,g={width:0,x:d.left+d.width/2,y:d.top+d.height/2};return c.set(this._container,{width:d.width,height:d.height,x:d.left,y:d.top,position:"fixed",overflow:"hidden"}),c.to([this._container,g],2,{width:f,height:"100%",x:f/2,y:0,xPercent:-50,ease:Expo.easeInOut,clearProps:"all",className:"-="+e.containerClosed,onUpdate:b.bind(this,g)}),c},c.prototype._clipImageOut=function(){var a=this._clipImageIn();return a.reverse(),a},c.prototype._slideContentUp=function(){var a=TweenLite.to(this._content,1,{y:0,clearProps:"all",ease:Expo.easeInOut});return a},c.prototype.closeCard=function(){return TweenLite.to(this._container,.4,{scrollTo:{y:0},onComplete:function(){$(this._container).css("overflow","hidden")}.bind(this),ease:Power2.easeOut}),this._TL.eventCallback("onReverseComplete",function(){TweenLite.set([this._container,this._content],{clearProps:"all"}),$(document.body).removeClass(e.bodyHidden),this.isOpen=!1}.bind(this)),this._TL.reverse()},c.prototype.hideCard=function(){var a=TweenLite.to(this._el,.4,{scale:.8,autoAlpha:0,transformOrigin:"center bottom",ease:Expo.easeInOut});return a},c.prototype.showCard=function(){var a=TweenLite.to(this._el,.5,{scale:1,autoAlpha:1,clearProps:"all",ease:Expo.easeInOut});return a},c}(window),polygon=function(a,b){function c(){var b=new Trianglify({width:a.innerWidth,height:a.innerHeight,cell_size:90,variance:1,stroke_width:2,color_function:function(){return"#0F0D0D"}}).svg();d(b),e()}function d(a){$(j.pattern).append(a),l.paths=[].slice.call(a.childNodes),l.points=[],l.paths.forEach(function(a){$(a).attr("class",k.polygon);var b=a.getBoundingClientRect(),c={x:b.left+b.width/2,y:b.top+b.height/2};l.points.push(c)}),$(j.pattern).removeClass(k.patternHidden)}function e(){var a=$(j.card);$.each(a,function(a,b){var c=new Card(a,b);m[a]={card:c};var d=$(b).find(j.cardImage),e=$(b).find(j.cardClose);$(d).on("click",f.bind(this,!0,a)),$(e).on("click",f.bind(this,!1,a))})}function f(a,b){var c=m[b].card;if(!c.isOpen||!a){var d=new TimelineLite({paused:!0}),e=g(b);if(c.isOpen){var f=c.closeCard(),i=.8*f.duration();d.add(f),d.add(e,i),$("slideshow, #grid-header").css("visibility","visible"),console.log($(c._el).find(".card__video")),$(c._el).find(".card__video").fadeOut("fast")}else d.add(e),d.add(c.openCard(h),0),$("slideshow, .md-subtoolbar").css("visibility","hidden");d.play()}}function g(a){var b=new TimelineLite,c=m[a].card;for(var d in m){var e=m[d].card;e.id===a||c.isOpen||b.add(e.hideCard(),0),e.id!==a&&c.isOpen&&b.add(e.showCard(),0)}return b}function h(a){var b=a.width/2,c={x:a.x,y:a.y};l.points.forEach(function(a,d){i(a,b,c)?$(l.paths[d]).attr("class",k.polygon+" "+k.polygonHidden):$(l.paths[d]).attr("class",k.polygon)})}function i(a,b,c){var d=a.x,e=a.y,f=c.x,g=c.y,h=b*b,i=Math.pow(d-f,2)+Math.pow(e-g,2)<=h;return i}var j={pattern:".pattern",card:".card",cardImage:".card__image",cardClose:".card__btn-close"},k={patternHidden:"pattern--hidden",polygon:"polygon",polygonHidden:"polygon--hidden"},l={paths:null,points:null},m={};return{init:c}}(window);if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){var root=document.getElementsByTagName("html")[0];root.setAttribute("class","ff")}var ToolbarCtrl=function(a,b,c,d,e,f,g,h,i){var j=this;j.isSearch=!1,j.search="",j.toggleMenu=function(){d("left").toggle()},j.moreMenu=function(a,b){a(b)},j.filter=function(a,b){i.search("t",b),i.search("sort",a)},j.setSearch=function(){j.isSearch=!j.isSearch,j.isSearch?$('input[type="search"]').focus():(j.searchText="",j.selectedItem=void 0)},j.selectedItemChange=function(a){a&&d("left").close().then(function(){i.path(a.url)})},j.querySearch=function(a){var b=c.defer();return reddit.searchSubreddits(a).limit(10).fetch(function(a){b.resolve(a.data.children)},function(a){b.reject(a)}),b.promise},j.openSearchFromMenu=function(){d("left").close().then(function(){j.setSearch()})},j.openSettings=function(a){e.show({controller:DialogCtrl,templateUrl:"views/dialogs/settings.html",parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!0,preserveScope:!0,controllerAs:"dialog",bindToController:!0,locals:{settings:b.$storage.settings}})},j.openShare=function(){},j.loadSub=function(a){d("left").close().then(function(){i.path(a.name)})},j.infoSub=function(a,b){g.start(),reddit.about(f.cleanUrl(a.name)).fetch(function(a){e.show({controller:DialogCtrl,templateUrl:"views/dialogs/info.html",parent:angular.element(document.body),targetEvent:b,clickOutsideToClose:!0,controllerAs:"dialog",preserveScope:!0,bindToController:!0,locals:{data:a.data}}).then(function(){g.complete()})})},j.deleteSub=function(a,c){e.show(e.confirm().parent(angular.element(document.body)).clickOutsideToClose(!0).title("Delete Sub-Reddit").textContent("Are you sure you want remove this subreddit: "+a.name+" from showing?").ok("Delete!").cancel("Cancel").targetEvent(c)).then(function(){b.$storage.subs=h.filter(b.$storage.subs,function(b){return a.name!==b.name}),e.hide()})}};ToolbarCtrl.$inject=["$scope","$rootScope","$q","$mdSidenav","$mdDialog","UtilsService","cfpLoadingBar","lodash","$location"],angular.module("raticateApp").controller("ToolbarCtrl",ToolbarCtrl);var MainCtrl=function(a,b,c,d){a.isLoaded=!1,a.fallback_img="images/logo_transparent.552a3f8e.png",a.$storage=b.$default({subs:c,settings:{autoplay:!0}}),a.subData={sub:d.sub||"/r/All",filter:{time:d.t||"hour",sort:d.sort||"hot"}}};MainCtrl.$inject=["$rootScope","$localStorage","subs","$routeParams"],angular.module("raticateApp").controller("MainCtrl",MainCtrl),GridCtrl.$inject=["$rootScope","cfpLoadingBar","lodash","UtilsService","$mdToast","$mdDialog","$sce","$timeout","UtilsService","$routeParams"],angular.module("raticateApp").directive("grid",gridDirective),SlideShowCtrl.$inject=["$scope","lodash","$location","$localStorage","$mdToast"],angular.module("raticateApp").directive("slideshow",slideShowDirective),angular.module("raticateApp").constant("subs",[{name:"/r/All",image:null},{name:"/r/ClassicalMusic",image:null},{name:"/r/DeepIntoYoutube",image:null},{name:"/r/FringeDiscussion",image:null},{name:"/r/FullMoviesOnYoutube",image:null},{name:"/r/Games",image:null},{name:"/r/HipHopHeads",image:null},{name:"/r/Jazz",image:null},{name:"/r/KidSafeVideos",image:null},{name:"/r/LearnUselessTalents",image:null},{name:"/r/ListenToThis",image:null},{name:"/r/Music",image:null},{name:"/r/PBS",image:null},{name:"/r/RedditPicks",image:null},{name:"/r/ScienceVideos",image:null},{name:"/r/Sports",image:null},{name:"/r/Television",image:null},{name:"/r/TheNewYorkTimes",image:null},{name:"/r/TodayILearned",image:null},{name:"/r/Videos",image:null},{name:"/r/YoutubeHaiku",image:null}]);var DialogCtrl=function(a,b,c){var d=this;d.close=function(){a.hide()},d.html=function(a){return b.trustAsHtml(c.unescape(a))}};DialogCtrl.$inject=["$mdDialog","$sce","lodash"],angular.module("raticateApp").controller("DialogCtrl",DialogCtrl),UtilsService.$inject=["lodash"],angular.module("raticateApp").service("UtilsService",UtilsService),angular.module("raticateApp").run(["$templateCache",function(a){a.put("views/dialogs/info.html",'<md-dialog aria-label="{{dialog.data.title}}" ng-cloak> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>{{dialog.data.title}}</h2> <span flex></span> <div layout="row" layout-xs="column" class="dialog-info"> <div flex="75"> <div ng-if="dialog.data.subscribers" id="readers">{{dialog.data.subscribers | number}} Readers</div> <div ng-if="dialog.data.accounts_active" id="active">{{dialog.data.accounts_active | number}} ONLINE NOW</div> </div> <div flex="25"> <md-button class="md-icon-button" ng-click="dialog.close()"> <i aria-label="Close dialog" class="material-icons">close</i> </md-button> </div> </div> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <p ng-bind-html="dialog.html(dialog.data.description_html)" ng-if="dialog.data.description_html"></p> <p ng-bind-html="dialog.html(dialog.data.submit_text_html)" ng-if="dialog.data.submit_text_html"></p> </div> </md-dialog-content> <md-dialog-actions layout="row"> <md-button ng-click="dialog.close()" md-autofocus> Ok </md-button> </md-dialog-actions> </form> </md-dialog>'),a.put("views/dialogs/settings.html",'<md-dialog aria-label="Settings" ng-cloak> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Settings</h2> <span flex></span> <md-button class="md-icon-button" ng-click="dialog.close()"> <i aria-label="Close dialog" class="material-icons">close</i> </md-button> </div> </md-toolbar> <md-dialog-content> <md-list> <md-list-item> <md-icon class="material-icons">play_circle_outline</md-icon> <p>Video Autoplay{{$storage.settings.autoplay}}</p> <md-switch class="md-secondary" ng-model="dialog.settings.autoplay"></md-switch> </md-list-item> </md-list> </md-dialog-content> <md-dialog-actions layout="row"> <md-button ng-click="dialog.close()"> Cancel </md-button> <span flex></span> <md-button ng-click="dialog.close()" class="md-raised md-primary" md-autofocus> Save </md-button> </md-dialog-actions> </form> </md-dialog>'),a.put("views/directives/grid.html",'<md-toolbar class="md-subtoolbar" ng-if="grid.videos.children.length >= 0"> <span flex></span> <h2 class="md-toolbar-tools"> <span id="grid-header">{{subData.sub}}</span> </h2> </md-toolbar> <div flex ng-cloak> <div infinite-scroll="grid.loadMore()" infinite-scroll-disabled="grid.isBusy" infinite-scroll-immediate-check="false" ng-init="grid.isBusy = true" infinite-scroll-distance="0"> <md-grid-list md-cols-xs="1" md-cols-sm="2" md-cols-md="4" md-cols-gt-md="6" md-row-height-gt-md="1:1" md-row-height="2:2" md-gutter="12px" md-gutter-gt-sm="8px"> <md-grid-tile ng-repeat="video in grid.videos.children" md-rowspan="{{video.span.row}}" md-colspan="{{video.span.col}}" md-colspan-sm="2" md-colspan-xs="2"> <div class="card"> <div class="card__container card__container--closed"> <svg svg-fallback class="card__image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 1920 500" preserveaspectratio="xMidYMid slice" ng-click="grid.isBusy = true;grid.loadVideo(video.data);$event.stopPropagation();"> <defs> <clippath id="clipPath{{$index}}"> <polygon class="clip" points="0,500 0,0 1920,0 1920,500"></polygon> </clippath> </defs> <image clip-path="url(#clipPath{{$index}})" width="1920" height="500" xlink:href="" src="images/logo_transparent.552a3f8e.png" ng-attr-xlink:href="{{grid.trustSrc(video.data.media.oembed.thumbnail_url)}}"></image> <div id="player_{{video.data.id}}" class="card__video"> </svg> <div class="card__content"> <i class="card__btn-close material-icons" ng-click="grid.isBusy = false;">close</i> <div class="card__caption"> <h2 class="card__title"> <a ng-href="{{\'http://reddit.com/\' + video.data.permalink}}"> {{video.data.title}} </a> <span class="nsfw" ng-if="video.data.over_18">NSFW</span> </h2> <p class="card__subtitle"></p> </div> <div class="card__copy"> <div class="meta"> <img class="meta__avatar" src="images/logo_transparent.552a3f8e.png" ng-src="{{grid.trustSrc(video.data.media.oembed.thumbnail_url)}}" alt="{{video.data.title}}"> <div> <div class="meta__author">Submitted {{video.data.created}} by <a ng-href="{{\'https://www.reddit.com/user/\' + video.data.author}}">{{video.data.author}}</a> to <a href="\'http://reddit.com/r/\' + {{video.data.subreddit}}">{{\'/r/\' + video.data.subreddit}}</a></div> <div class="meta__date">{{\'Score: \' + video.data.score}} &nbap;</div> </div> </div> <p>Business model canvas bootstrapping deployment startup. In A/B testing pivot niche market alpha conversion startup down monetization partnership business-to-consumer success for investor mass market business-to-business.</p> <p>Release creative social proof influencer iPad crowdsource gamification learning curve network effects monetization. Gamification business plan mass market www.discoverartisans.com direct mailing ecosystem seed round sales long tail vesting period.</p> <p>Product management ramen bootstrapping seed round venture holy grail technology backing partner network entrepreneur beta marketing value proposition. Android stealth conversion scrum project network effects. Creative alpha long tail conversion stealth growth hacking iteration investor A/B testing prototype customer. Startup www.discoverartisans.com direct mailing launch party partnership market ramen metrics focus value proposition.</p> <p>Stock infrastructure seed round sales paradigm shift technology user experience focus gamification. Partnership metrics business plan stealth business-to-business. Deployment graphical user interface monetization. Twitter incubator scrum project entrepreneur branding burn rate ramen backing paradigm shift virality crowdsource.</p> <p>Social proof MVP ecosystem. Ramen launch party pitch deployment stealth. Vesting period MVP equity. Focus creative partnership founders iteration agile development infographic.</p> <p>Low hanging fruit burn rate innovator user experience niche market A/B testing creative launch party product management release. Www.discoverartisans.com influencer business model canvas user experience gamification paradigm shift startup research &amp; development iPad agile development. Strategy incubator infographic success marketing buzz A/B testing responsive web design. Traction research &amp; development pitch seed money venture niche market accelerator network effects.</p> </div> </div> </div> </div> </md-grid-tile> </md-grid-list> <div ng-show="grid.isBusy"> <div class="sk-folding-cube"> <div class="sk-cube1 sk-cube"></div> <div class="sk-cube2 sk-cube"></div> <div class="sk-cube4 sk-cube"></div> <div class="sk-cube3 sk-cube"></div> </div> </div> </div> </div>'),a.put("views/directives/slideshow.html",'<md-toolbar class="md-subtoolbar" ng-if="slide.trending.length >= 0"> <span flex></span> <h2 class="md-toolbar-tools"> <span id="trend-header" class="md-flex">What\'s Trending</span> </h2> </md-toolbar> <div class="owl-carousel owl-theme"> <div class="item" ng-repeat="item in slide.trending track by $index" ng-click="slide.loadSub(item)"> <img ng-src="{{item.data[0].media.thumbnail_url}}" alt="{{item.data[0].subreddit}}"> <h3 class="slider-header">/r/<span class="capitalize">{{item.data[0].subreddit}}</span></h3> </div> </div>'),a.put("views/main.html","<slideshow></slideshow> <grid></grid>")}]);