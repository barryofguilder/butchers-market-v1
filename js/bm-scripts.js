//
// The Butcher's Market JavaScript
// --------------------------------------------------
// Includes all JavaScript for the site

(function($) {

  var theWindow = $(window),
      theCarousel = $('.carousel'),
      //carouselMaxWidth = 3840,  // Update to match carousel image width
      //carouselMaxHeight = 1513, // Update to match carousel image height
      carouselMaxWidth = 612,  // Update to match carousel image width
      carouselMaxHeight = 397, // Update to match carousel image height
      carouselRatio = (carouselMaxHeight * 100) / carouselMaxWidth,

      //carouselMobileBreakpoint = 850,// The width breakpoint for mobile carousel
      //carouselMobileMaxWidth = 850,  // Update to match mobile carousel image width
      carouselMobileBreakpoint = 850,// The width breakpoint for mobile carousel
      carouselMobileMaxWidth = 612,  // Update to match mobile carousel image width
      carouselMobileMaxHeight = 397, // Update to match mobile carousel image height
      carouselMobileRatio = (carouselMobileMaxHeight * 100) / carouselMobileMaxWidth;

  // Adjusts the size of the carousel based on the current window size
  //
  function adjustCarouselSize() {
    var windowWidth = theWindow.width(),
        imageSize = theCarousel.data('image-size'),
        isMobile = windowWidth <= carouselMobileBreakpoint,
        carouselWidth = theCarousel.width(),
        carouselHeight;

    // Calculate the carousel height
    if (isMobile) {
      carouselHeight = (carouselWidth * carouselMobileRatio) / 100;
    } else if (windowWidth < carouselMaxWidth) {
      carouselHeight = (carouselWidth * carouselRatio) / 100;
    } else {
      carouselHeight = carouselMaxHeight;
    }

    replaceCarouselImages(isMobile, imageSize);

    // Set the carousel's new height
    theCarousel.height(carouselHeight);
  }

  // Swaps out the carousel images depending on the current window size
  //
  function replaceCarouselImages(isMobile, imageSize) {
    if (isMobile && imageSize === 'normal') {
      theCarousel.find('img').each(function () {
        var image = $(this),
            imageSrc = image.attr('src'),
            extensionIndex = imageSrc.lastIndexOf('.'),
            newImageSrc = imageSrc.substring(0, extensionIndex) + '-sm' + imageSrc.substring(extensionIndex);

        image.attr('src', newImageSrc);
      });
      theCarousel.data('image-size', 'mobile');
    } else if (!isMobile && imageSize === 'mobile') {
      theCarousel.find('img').each(function () {
        var image = $(this),
            imageSrc = image.attr('src'),
            extensionIndex = imageSrc.lastIndexOf('-sm'),
            newImageSrc = imageSrc.substring(0, extensionIndex) + imageSrc.substring(extensionIndex + 3);

        image.attr('src', newImageSrc);
      });
      theCarousel.data('image-size', 'normal');
    }
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
