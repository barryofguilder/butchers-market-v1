//
// Deli More Info
// --------------------------------------------------
// Handles the 'More Info' modal for the deli items


butcher.deliMoreInfo = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $('.deli-item').on('click', '.deli-item-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      var deliModal = $('#deli-item-modal'),
        button = $(this),
        deliItem = button.parents('.deli-item').first();

      deliModal.find('#deli-item-modal-title').html(getTitle(deliItem));
      deliModal.find('#deli-item-description').html(getDescription(button));
      deliModal.find('#deli-item-modal-image').attr('src', getImageSource(deliItem));

      deliModal.modal();
    });

  });

  function getTitle(deliItem) {
    var title = deliItem.find('.deli-item-title').html();

    return title;
  }

  function getDescription(button) {
    var description = button.data('item-description');

    return description;
  }

  function getImageSource(deliItem) {
    var image = deliItem.find('img'),
        source = image.attr('src');

    return source;
  }

} (window.jQuery);
