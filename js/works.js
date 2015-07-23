(function($) {

  $window = $(window);
  $cover = $('.cover, .content');
  $body = $('body');
  var $container = $('#container');

  causeRepaintsOn = $("h1, h2, h3, p");


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

  var s = skrollr.init({
    smoothScrolling: true,
    forceHeight: false
  });


  // adjusts various heights of things and skrollr refresh
  var adjustWindow = function() {
    console.log('adjusting window');

    winH = $window.height();
    if (winH <= 450) {
      winH = 450;
    }
    $cover.height(winH);
    $('#works').height(.9 * winH);
    s.refresh();
  }


  $window.resize(function() {
    causeRepaintsOn.css("z-index", 1);
    $container.isotope({
      masonry: {
        columnWidth: $container.width() / 10
      }
    });
    adjustWindow();

  });


  $window.bind('scroll', function() {
    var navHeight = $window.height() - 70;
    if ($window.scrollTop() > navHeight) {
      $('#filtration_bar').addClass('fixed');
    } else {
      $('#filtration_bar').removeClass('fixed');
    }
  });


  //THIS IS THE ONE THAT WORKS

  // $(document).ready(function() {
  //   $('.filters-button-group').on('click', 'button', function() {
  //     var filterValue = $(this).attr('data-filter');
  //     $container.isotope({
  //       filter: filterValue
  //     });
  //     window.dispatchEvent(new Event('resize'));
  //   });
  //   $('.button-group').each(function(i, buttonGroup) {
  //     var $buttonGroup = $(buttonGroup);
  //     $buttonGroup.on('click', 'button', function() {
  //       $buttonGroup.find('.is-checked').removeClass('is-checked');
  //       $(this).addClass('is-checked');
  //     });
  //   });
  // });

  // Copy pasta from code pen example

  function getHashFilter() {
    // get filter=filterName
    var matches = location.hash.match(/filter=([^&]+)/i);
    var hashFilter = matches && matches[1];
    return hashFilter && decodeURIComponent(hashFilter);
  }

  var $grid = $('.grid');

  // bind filter button click
  var $filterButtonGroup = $('.filters-button-group');
  $filterButtonGroup.on('click', 'button', function() {
    var filterAttr = $(this).attr('data-filter');
    // set filter in hash
    location.hash = 'filter=' + encodeURIComponent(filterAttr);
  });

  var isIsotopeInit = false;

  function onHashchange() {
    var hashFilter = getHashFilter();
    if (!hashFilter && isIsotopeInit) {
      return;
    }
    isIsotopeInit = true;
    // filter isotope
    $container.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      filter: hashFilter //var filterValue = $(this).attr('data-filter');
    });
    // set selected class on button
    if (hashFilter) {
      $filterButtonGroup.find('.is-checked').removeClass('is-checked');
      $filterButtonGroup.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
    }
  }

  $(window).on('hashchange', onHashchange);

  // trigger event handler to init Isotope
  onHashchange();




})(jQuery);
