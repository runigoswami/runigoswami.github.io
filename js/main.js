(function($) {

  $window = $(window);
  $slide = $('.cover, .content');
  $body = $('body');
  var $container = $('#container');

  causeRepaintsOn = $("h1, h2, h3, p");

  var snap = Snap('#runicloud_svg');
  if (snap) {
    Snap.load("/img/svgs/runicloud.svg", function(f) {
      var thoughts = ["#brain", "#soundcloud", "#deathly_hallows", "#paintbrush", "#om", "#skate", "#wave", "#tea", "#mantis_shrimp", "#photos", "#tjhsst", "#play_buttons", "#oxytocin", "#dodecahedron", "#plane_ticket"];
      snap.append(f);
      for (i = 0; i < thoughts.length; i++) {
        var thought = thoughts[i];
        snap.select(thought + "_container").hover(function(d) {
          var sel = '#' + d.path[1].id.replace("_container", "");;
          console.log(sel);
          snap.select(sel).attr({
            fill: "#5acecf"
          });
        }, function(d) {
          var sel = '#' + d.path[1].id.replace("_container", "");;
          console.log(sel);
          snap.select(sel).attr({
            fill: "#434343"
          });
        });
      }
      snap.select('svg').attr({
        preserveAspectRatio: "xMaxYMin meet"
      });
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
    $('#works').height(.9 * winH);
    // $('#content-0').height(1.6 * winH);
    //s.refresh($('.cover, .content'));
    
    s.refresh();
  }



})(jQuery);
