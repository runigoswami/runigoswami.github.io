(function($) {

  // Setup variables
  $window = $(window);
  $slide = $('.cover, .content');
  $body = $('body');



  //FadeIn all sections
  $body.imagesLoaded(function() {
    setTimeout(function() {

      // Resize sections
      adjustWindow();

      // Fade in sections
      $body.removeClass('loading').addClass('loaded');

    }, 1);
  });


  function adjustWindow() {

    // Init Skrollr
    var s = skrollr.init({
      render: function(data) {
        //Debugging - Log the current scroll position.
        //console.log(data.curTop);
      },
      smoothScrolling: true

    });


    // Get window size
    winH = $window.height();
    // Keep minimum height 550
    if (winH <= 450) {
      winH = 450;
    }

    // Resize our slides
    $slide.height(winH);
    var halfWindowHeight = winH - (winH / 2);
    var onethirdsHeight = (winH) / 3;
    $('#cover-1').height(2*onethirdsHeight);
    $('#cover-2').height(2*onethirdsHeight);
    // $('#cover-1 .covercontainer').height(twothirdsHeight);
    // $('#cover-1 .handscontainer').height(twothirdsHeight);

    // Refresh Skrollr after resizing our sections
    s.refresh($('.cover, .content'));
  }

  causeRepaintsOn = $("h1, h2, h3, p");

  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
    adjustWindow();
  });
  //
  // function bbox(e) {
  //   if (e && e.getBBox) {
  //     var box = e.getBBox();
  //     if (box.x && box.y && box.width && box.height) {
  //       var rect = box.path;
  //
  //       // rect.setAttributeNS(null, 'fill', 'rgba(0,0,0,0)');
  //       // rect.setAttributeNS(null, 'stroke', 'rgba(0,0,0,0)');
  //       // rect.setAttributeNS(null, 'transform', transform);
  //       e.append(rect);
  //       console.log(rect);
  //       return rect;
  //     }
  //   }
  //   return null;
  // };


  // var s = Snap('#runicloud_svg');
  // Snap.load("img/svgs/runicloud.svg", function(f) {
  //   // Note that we traversre and change attr before SVG
  //   // is even added to the page
  //   var thoughts = [
  //     "#brain", "#soundcloud", "#deathly_hallows", "#paintbrush", "#om", "#skate", "#wave", "#tea",
  //     "#mantis_shrimp", "#photos", "#tjhsst", "#play_buttons", "#oxytocin", "#dodecahedron", "#plane_ticket"
  //   ];
  //
  //   s.append(f);
  //   for (i = 0; i < thoughts.length; i++) {
  //     // console.log(thoughts[i]+y);
  //     var thought = thoughts[i];
  //     s.select(thought + "_container").hover(
  //       function(d) {
  //         var sel = '#' + d.path[1].id.replace("_container", "");;
  //         console.log(sel);
  //         s.select(sel).attr({
  //           fill: "#5acecf"
  //         });
  //       },
  //       function(d) {
  //         var sel = '#' + d.path[1].id.replace("_container", "");;
  //         console.log(sel);
  //         s.select(sel).attr({
  //           fill: "#434343"
  //         });
  //       }
  //     );
  //   }
  //
  //
  //   s.select('svg').attr({
  //     preserveAspectRatio: "xMaxYMin meet"
  //   });
  // });




})(jQuery);
