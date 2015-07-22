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

  if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
    function adjustWindow() {
      var s = skrollr.init({
        render: function(data) {},
        smoothScrolling: true
      });
      winH = $window.height();
      if (winH <= 450) {
        winH = 450;
      }
      $slide.height(winH);
      var halfWindowHeight = winH - (winH / 2);
      var onethirdsHeight = (winH) / 3;
      // $('#cover-1').height(2 * onethirdsHeight);
      $('#works').height(.9 * winH);
      s.refresh($('.cover, .content'));
    }
  }
  // if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
  //   skrollr.init({
  //     forceHeight: false
  //   });
  // }
  causeRepaintsOn = $("h1, h2, h3, p");
  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
    adjustWindow();
  });
  var s = Snap('#runicloud_svg');
  Snap.load("/img/svgs/runicloud.svg", function(f) {
    var thoughts = ["#brain", "#soundcloud", "#deathly_hallows", "#paintbrush", "#om", "#skate", "#wave", "#tea", "#mantis_shrimp", "#photos", "#tjhsst", "#play_buttons", "#oxytocin", "#dodecahedron", "#plane_ticket"];
    s.append(f);
    for (i = 0; i < thoughts.length; i++) {
      var thought = thoughts[i];
      s.select(thought + "_container").hover(function(d) {
        var sel = '#' + d.path[1].id.replace("_container", "");;
        console.log(sel);
        s.select(sel).attr({
          fill: "#5acecf"
        });
      }, function(d) {
        var sel = '#' + d.path[1].id.replace("_container", "");;
        console.log(sel);
        s.select(sel).attr({
          fill: "#434343"
        });
      });
    }
    s.select('svg').attr({
      preserveAspectRatio: "xMaxYMin meet"
    });
  });
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
  $(document).ready(function() {
    var $container = $('#container')
    $container.isotope({
      resizable: false,
      masonry: {
        columnWidth: $container.width() / 10
      }
    });
    $('.filters-button-group').on('click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({
        filter: filterValue
      });
      window.dispatchEvent(new Event('resize'));
    });
    $('.button-group').each(function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });
    $(window).resize(function() {
      $container.isotope({
        masonry: {
          columnWidth: $container.width() / 10
        }
      });
    });
  });
})(jQuery);
