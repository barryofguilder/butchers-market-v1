//
// Go Top
// --------------------------------------------------
// Button that takes you to the top of the page


butcher.goTopButton = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    // Show or hide the sticky footer button
    $(window).scroll(function() {
      if ($('.secondary-navigation').visible() || $(this).scrollTop() < 550) {
        $('.go-top').fadeOut(200);
      } else {
        $('.go-top').fadeIn(200);
      }
    });

    // Animate the scroll to top
    $('.go-top').click(function(e) {
      e.preventDefault();

      $('html, body').animate({scrollTop: 0}, 300);
    });

  });

} (window.jQuery);
