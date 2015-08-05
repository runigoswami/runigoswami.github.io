(function($) {
  $window = $(window);
  $slide = $('.cover, .content');
  $body = $('body');

  $body.imagesLoaded(function() {
    setTimeout(function() {
      adjustWindow();
      $body.removeClass('loading').addClass('loaded');
    }, 1);
  });

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  // $('#displaymarky').html(marked($('#mymarkdown').html()));



  if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
    function adjustWindow() {
      var s = skrollr.init({
        smoothScrolling: true,
        forceHeight: false
      });
      winH = $window.height();
      if (winH <= 450) {
        winH = 450;
      }
      $slide.height(winH);
      var halfWindowHeight = winH - (winH / 2);
      var onethirdsHeight = (winH) / 3;
      $('.cover').height(.9 * winH);
      $('#vcl-cover').height(halfWindowHeight);
      $('#metrics-cover').height(halfWindowHeight);
      $('#berry-cover').height(2*onethirdsHeight);
      s.refresh($('.cover, .content'));
    }
  }

  causeRepaintsOn = $("h1, h2, h3, p");
  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
    adjustWindow();
  });

})(jQuery);
