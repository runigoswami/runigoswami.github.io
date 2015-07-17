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

    // Resize our sections
    $slide.height(winH);
    var halfWindowHeight = winH - (winH / 2);
    var onethirdsHeight = (winH) / 3;
    $('#cover-1').height(2 * onethirdsHeight);
    $('#works').height(.9 * winH);
    // $('#cover-2').height(2*onethirdsHeight);
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

  //Runi cloud hover effects

  var s = Snap('#runicloud_svg');
  Snap.load("http://runigoswami-dali.imgix.net/svgs/runicloud.svg", function(f) {
    // Note that we traversre and change attr before SVG
    // is even added to the page
    var thoughts = [
      "#brain", "#soundcloud", "#deathly_hallows", "#paintbrush", "#om", "#skate", "#wave", "#tea",
      "#mantis_shrimp", "#photos", "#tjhsst", "#play_buttons", "#oxytocin", "#dodecahedron", "#plane_ticket"
    ];

    s.append(f);
    for (i = 0; i < thoughts.length; i++) {
      // console.log(thoughts[i]+y);
      var thought = thoughts[i];
      s.select(thought + "_container").hover(
        function(d) {
          var sel = '#' + d.path[1].id.replace("_container", "");;
          console.log(sel);
          s.select(sel).attr({
            fill: "#5acecf"
          });
        },
        function(d) {
          var sel = '#' + d.path[1].id.replace("_container", "");;
          console.log(sel);
          s.select(sel).attr({
            fill: "#434343"
          });
        }
      );
    }
    s.select('svg').attr({
      preserveAspectRatio: "xMaxYMin meet"
    });
  });

  //Filtration Bar Styling on Selected Works Page

  $(document).ready(function() {
    $(window).bind('scroll', function() {
      var navHeight = $(window).height() - 70;
      if ($(window).scrollTop() > navHeight) {
        $('#filtration_bar').addClass('fixed');
      } else {
        $('#filtration_bar').removeClass('fixed');
      }
    });
  });

  //Filtration Bar filtering

  $(document).ready(function() {

    var $container = $('#container')
      // initialize Isotope
    $container.isotope({
      // options...
      resizable: false, // disable normal resizing
      // set columnWidth to a percentage of container width
      masonry: {
        columnWidth: $container.width() / 10
      }
    });
    // bind filter button click
    $('.filters-button-group').on('click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      // use filterFn if matches value
      // filterValue = filterFns[filterValue] || filterValue;
      $container.isotope({
        filter: filterValue
      });
      window.dispatchEvent(new Event('resize'));
    });
    // change is-checked class on buttons
    $('.button-group').each(function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });


    // update columnWidth on window resize
    $(window).resize(function() {
      $container.isotope({
        // update columnWidth to a percentage of container width
        masonry: {
          columnWidth: $container.width() / 10
        }
      });
    });
  });

})(jQuery);
