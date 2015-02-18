//
// More Button
// --------------------------------------------------
//


butcher.moreButton = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $(document).on('click', '#more-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      var dropdown = $(this).siblings('.bm-dropdown');

      dropdown.toggleClass('bm-show');
    });

  });

} (window.jQuery);
