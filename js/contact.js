(function($) {

  $window = $(window);
  $slide = $('.cover, .content');
  $body = $('body');
  var $container = $('#container');

  causeRepaintsOn = $("h1, h2, h3, p");

  // Input Lock
  $('textarea').blur(function () {
      $('#hire textarea').each(function () {
          $this = $(this);
          if ( this.value != '' ) {
            $this.addClass('focused');
            $('textarea + label + span').css({'opacity': 1});
          }
          else {
            $this.removeClass('focused');
            $('textarea + label + span').css({'opacity': 0});
          }
      });
  });

  $('#hire .field:first-child input').blur(function () {
      $('#hire .field:first-child input').each(function () {
          $this = $(this);
          if ( this.value != '' ) {
            $this.addClass('focused');
            $('.field:first-child input + label + span').css({'opacity': 1});
          }
          else {
            $this.removeClass('focused');
            $('.field:first-child input + label + span').css({'opacity': 0});
          }
      });
  });

  $('#hire .field:nth-child(2) input').blur(function () {
      $('#hire .field:nth-child(2) input').each(function () {
          $this = $(this);
          if ( this.value != '' ) {
            $this.addClass('focused');
            $('.field:nth-child(2) input + label + span').css({'opacity': 1});
          }
          else {
            $this.removeClass('focused');
            $('.field:nth-child(2) input + label + span').css({'opacity': 0});
          }
      });
  });


  var s = skrollr.init({
    smoothScrolling: true,
    forceHeight: false
  });


  //  triggers an adjust once everything is fully loaded
  // without this skrollr is jerky
  $window.load(function() {
    $window.trigger('resize');
  });

  //fades in once images are all loaded
  $body.imagesLoaded(function() {
    setTimeout(function() {
      $body.removeClass('loading').addClass('loaded');
      adjustWindow();
    }, 100);
  });


  // adjusts various heights of things and skrollr refresh
  var adjustWindow = function() {
    console.log('adjusting window');

    winH = $window.height();
    if (winH <= 450) {
      winH = 450;
    }
    $slide.height(winH);
    var halfWindowHeight = winH - (winH / 2);
    var onethirdsHeight = (winH) / 3;
    // $('#cover-1').height(2 * onethirdsHeight);
    $('#works').height(.9 * winH);
    // $('#content-0').height(1.6 * winH);
    //s.refresh($('.cover, .content'));

    s.refresh();
  }



})(jQuery);
