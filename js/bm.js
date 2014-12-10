//
// The Butcher's Market JavaScript
// --------------------------------------------------
// Includes all JavaScript for the site

(function($) {

  var theWindow = $(window),
      theCarousel = $('.carousel'),
      carouselMaxWidth = 3840,  // Update to match carousel image width
      carouselMaxHeight = 1513, // Update to match carousel image height
      carouselRatio = (carouselMaxHeight * 100) / carouselMaxWidth;

  // Adjusts the size of the carousel based on the current window size
  //
  function adjustCarouselSize() {
    var windowWidth = theWindow.width(),
        carouselWidth = theCarousel.width(),
        carouselHeight = carouselMaxHeight;

    // Calculate the carousel height
    if (windowWidth < carouselMaxWidth) {
      carouselHeight = (carouselWidth * carouselRatio) / 100;
    }

    // Set the carousel's new height
    theCarousel.height(carouselHeight);
  }

  // Things to do once the page has loaded.
  //
  $(function() {

    adjustCarouselSize();

    $(window).resize(function() {
      adjustCarouselSize();
    });

  });

})(window.jQuery);