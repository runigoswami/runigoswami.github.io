(function($) {

  $window = $(window);
  $slide = $('.cover, .content');
  $body = $('body');
  var $container = $('#container');

  causeRepaintsOn = $("h1, h2, h3, p");


  var snap = Snap('#resume_svg');
  if (snap) {
    Snap.load("/img/svgs/resume.svg", function(f) {
      snap.append(f);
      $("#dali-link").click(function() {
        window.open("http://dali.dartmouth.edu", "_blank");
      });
      $("#skating-link").click(function() {
        window.open("http://dartmouth.edu/~skating/", "_blank");
      });
      $("#email-link").click(function() {
        window.location.href = "mailto:runigoswami@gmail.com";
      });
      $("#frameshift-link").click(function() {
        window.location = "/posts/frameshift";
      });
      $("#siggraph-link").click(function() {
        window.open("http://s2015.siggraph.org/", "_blank");
      });
      $("#portfolio-link").click(function() {
        window.open("/img/runi_goswami_portfolio.pdf", "_blank");
      });
      snap.select('svg').attr({
        preserveAspectRatio: "xMaxYMin meet"
      });
      console.log(snap.getBBox());
    });
  }

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
    s.refresh();
  }
})(jQuery);
