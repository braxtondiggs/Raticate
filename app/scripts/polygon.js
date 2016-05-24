'use strict';
/*global Expo, TweenLite, Power2, TimelineLite, Trianglify*/
var Card = (function(window, undefined) {

  /**
   * Enum of CSS selectors.
   */
  var SELECTORS = {
    container: '.card__container',
    content: '.card__content',
    clip: '.clip'
  };

  /**
   * Enum of CSS classes.
   */
  var CLASSES = {
    containerClosed: 'card__container--closed',
    bodyHidden: 'body--hidden'
  };

  /**
   * Card.
   */
  function Card(id, el) {

    this.id = id;

    this._el = el;

    // Get elements.
    this._container = $(this._el).find(SELECTORS.container)[0];
    this._clip = $(this._el).find(SELECTORS.clip)[0];
    this._content = $(this._el).find(SELECTORS.content)[0];

    this.isOpen = false;

    this._TL = null;
  }

  /**
   * Open card.
   * @param {Function} callback The callback `onCardMove`.
   */
  Card.prototype.openCard = function(callback) {

    this._TL = new TimelineLite();
    var _this = this;

    var slideContentDown = this._slideContentDown();
    var clipImageIn = this._clipImageIn();
    var floatContainer = this._floatContainer(callback);
    var clipImageOut = this._clipImageOut();
    var slideContentUp = this._slideContentUp();

    // Compose sequence and use duration to overlap tweens.
    this._TL.add(slideContentDown);
    this._TL.add(clipImageIn, 0);
    this._TL.add(floatContainer, '-=' + clipImageIn.duration() * 0.6);
    this._TL.add(clipImageOut, '-=' + floatContainer.duration() * 0.3);
    this._TL.add(slideContentUp, '-=' + clipImageOut.duration() * 0.6);
    setTimeout(function() {
      $(_this._el).find('.card__video').fadeIn('slow');
    }, 3000);

    this.isOpen = true;

    return this._TL;
  };

  /**
   * Slide content down.
   * @private
   */
  Card.prototype._slideContentDown = function() {

    var tween = TweenLite.to(this._content, 0.8, {
      y: window.innerHeight,
      ease: Expo.easeInOut
    });

    return tween;
  };

  /**
   * Clip image in.
   * @private
   */
  Card.prototype._clipImageIn = function() {

    // Polygon.
    var TL = new TimelineLite();

    var start = [
      [0, 500],
      [0, 0],
      [1920, 0],
      [1920, 500]
    ];

    var end = [
      [1025, 330],
      [1117, 171],
      [828, 206],
      [913, 260]
    ];

    var points = [];

    // Create a tween for each point.
    start.forEach(function(point, i) {

      var tween = TweenLite.to(point, 1.5, end[i]);

      end[i].onUpdate = function() {

        points.push(point.join());

        // Every 4 point update clip-path.
        if (points.length === end.length) {
          $(this._clip).attr('points', points.join(' '));
          // Reset.
          points = [];
        }

      }.bind(this);

      tween.vars.ease = Expo.easeInOut;

      // Add at position 0.
      TL.add(tween, 0);

    }, this);

    return TL;
  };

  /**
   * Float card to final position.
   * @param {Function} callback The callback `onCardMove`.
   * @private
   */
  Card.prototype._floatContainer = function(callback) {

    $(document.body).addClass(CLASSES.bodyHidden);

    var TL = new TimelineLite();

    var rect = this._container.getBoundingClientRect();
    var windowW = window.innerWidth;

    var track = {
      width: 0,
      x: rect.left + (rect.width / 2),
      y: rect.top + (rect.height / 2),
    };

    TL.set(this._container, {
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      position: 'fixed',
      overflow: 'hidden'
    });

    TL.to([this._container, track], 2, {
      width: windowW,
      height: '100%',
      x: windowW / 2,
      y: 0,
      xPercent: -50,
      ease: Expo.easeInOut,
      clearProps: 'all',
      className: '-=' + CLASSES.containerClosed,
      onUpdate: callback.bind(this, track)
    });

    return TL;
  };

  /**
   * Clip image out.
   * @private
   */
  Card.prototype._clipImageOut = function() {

    var tween = this._clipImageIn();

    tween.reverse();

    return tween;
  };

  /**
   * Slide content up.
   * @private
   */
  Card.prototype._slideContentUp = function() {

    var tween = TweenLite.to(this._content, 1, {
      y: 0,
      clearProps: 'all',
      ease: Expo.easeInOut
    });

    return tween;
  };

  /**
   * Close card.
   */
  Card.prototype.closeCard = function() {
    TweenLite.to(this._container, 0.4, {
      scrollTo: {
        y: 0
      },
      onComplete: function() {
        $(this._container).css('overflow', 'hidden');
      }.bind(this),
      ease: Power2.easeOut
    });

    this._TL.eventCallback('onReverseComplete', function() {

      TweenLite.set([this._container, this._content], {
        clearProps: 'all'
      });

      $(document.body).removeClass(CLASSES.bodyHidden);

      this.isOpen = false;

    }.bind(this));

    return this._TL.reverse();
  };

  /**
   * Hide card, called for all cards except the selected one.
   */
  Card.prototype.hideCard = function() {

    var tween = TweenLite.to(this._el, 0.4, {
      scale: 0.8,
      autoAlpha: 0,
      transformOrigin: 'center bottom',
      ease: Expo.easeInOut
    });

    return tween;
  };

  /**
   * Show card, called for all cards except the selected one.
   */
  Card.prototype.showCard = function() {

    var tween = TweenLite.to(this._el, 0.5, {
      scale: 1,
      autoAlpha: 1,
      clearProps: 'all',
      ease: Expo.easeInOut
    });

    return tween;
  };

  return Card;

})(window);

var polygon = (function(window, undefined) { // jshint ignore:line

  /**
   * Enum of CSS selectors.
   */
  var SELECTORS = {
    pattern: '.pattern',
    card: '.card',
    cardImage: '.card__image',
    cardClose: '.card__btn-close',
  };

  /**
   * Enum of CSS classes.
   */
  var CLASSES = {
    patternHidden: 'pattern--hidden',
    polygon: 'polygon',
    polygonHidden: 'polygon--hidden'
  };

  /**
   * Map of svg paths and points.
   */
  var polygonMap = {
    paths: null,
    points: null
  };

  /**
   * Container of Card instances.
   */
  var layout = {};

  function init() {
    // For options see: https://github.com/qrohlf/Trianglify
    var pattern = new Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: 90,
      variance: 1,
      stroke_width: 2,
      color_function: function() {
        return '#0F0D0D';
      }
    }).svg(); // Render as SVG.

    _mapPolygons(pattern);

    _bindCards();
  }

  /**
   * Store path elements, map coordinates and sizes.
   * @param {Element} pattern The SVG Element generated with Trianglify.
   * @private
   */
  function _mapPolygons(pattern) {

    // Append SVG to pattern container.
    $(SELECTORS.pattern).append(pattern);

    // Convert nodelist to array,
    // Used `.childNodes` because IE doesn't support `.children` on SVG.
    polygonMap.paths = [].slice.call(pattern.childNodes);

    polygonMap.points = [];

    polygonMap.paths.forEach(function(polygon) {

      // Hide polygons by adding CSS classes to each svg path (used attrs because of IE).
      $(polygon).attr('class', CLASSES.polygon);

      var rect = polygon.getBoundingClientRect();

      var point = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      polygonMap.points.push(point);
    });

    // All polygons are hidden now, display the pattern container.
    $(SELECTORS.pattern).removeClass(CLASSES.patternHidden);
  }

  /**
   * Bind Card elements.
   * @private
   */
  function _bindCards() {

    var elements = $(SELECTORS.card);
    $.each(elements, function(i, card) {

      var instance = new Card(i, card);

      layout[i] = {
        card: instance
      };
      var cardImage = $(card).find(SELECTORS.cardImage);
      var cardClose = $(card).find(SELECTORS.cardClose);

      $(cardImage).on('click', _playSequence.bind(this, true, i));
      $(cardClose).on('click', _playSequence.bind(this, false, i));
    });
  }

  /**
   * Create a sequence for the open or close animation and play.
   * @param {boolean} isOpenClick Flag to detect when it's a click to open.
   * @param {number} id The id of the clicked card.
   * @param {Event} e The event object.
   * @private
   *
   */
  function _playSequence(isOpenClick, id) {

    var card = layout[id].card;

    // Prevent when card already open and user click on image.
    if (card.isOpen && isOpenClick) {
      return;
    }

    // Create timeline for the whole sequence.
    var sequence = new TimelineLite({ paused: true });

    var tweenOtherCards = _showHideOtherCards(id);

    if (!card.isOpen) {
      // Open sequence.

      sequence.add(tweenOtherCards);
      sequence.add(card.openCard(_onCardMove), 0);
      $('slideshow, #grid-header').css('visibility', 'hidden');

    } else {
      // Close sequence.

      var closeCard = card.closeCard();
      var position = closeCard.duration() * 0.8; // 80% of close card tween.

      sequence.add(closeCard);
      sequence.add(tweenOtherCards, position);
      $('slideshow, #grid-header').css('visibility', 'visible');console.log($(card._el).find('.card__video'));
      $(card._el).find('.card__video').fadeOut('fast');
    }

    sequence.play();
  }

  /**
   * Show/Hide all other cards.
   * @param {number} id The id of the clcked card to be avoided.
   * @private
   */
  function _showHideOtherCards(id) {

    var TL = new TimelineLite();

    var selectedCard = layout[id].card;

    for (var i in layout) {

      var card = layout[i].card;

      // When called with `openCard`.
      if (card.id !== id && !selectedCard.isOpen) {
        TL.add(card.hideCard(), 0);
      }

      // When called with `closeCard`.
      if (card.id !== id && selectedCard.isOpen) {
        TL.add(card.showCard(), 0);
      }
    }

    return TL;
  }

  /**
   * Callback to be executed on Tween update, whatever a polygon
   * falls into a circular area defined by the card width the path's
   * CSS class will change accordingly.
   * @param {Object} track The card sizes and position during the floating.
   * @private
   */
  function _onCardMove(track) {

    var radius = track.width / 2;

    var center = {
      x: track.x,
      y: track.y
    };

    polygonMap.points.forEach(function(point, i) {

      if (_detectPointInCircle(point, radius, center)) {
        $(polygonMap.paths[i]).attr('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);
      } else {
        $(polygonMap.paths[i]).attr('class', CLASSES.polygon);
      }
    });
  }

  /**
   * Detect if a point is inside a circle area.
   * @private
   */
  function _detectPointInCircle(point, radius, center) {

    var xp = point.x;
    var yp = point.y;

    var xc = center.x;
    var yc = center.y;

    var d = radius * radius;

    var isInside = Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d;

    return isInside;
  }

  // Expose methods.
  return {
    init: init
  };

})(window);
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
  var root = document.getElementsByTagName('html')[0];
  root.setAttribute('class', 'ff');
}