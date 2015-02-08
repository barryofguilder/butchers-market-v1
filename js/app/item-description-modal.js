//
// Item Description Modal
// --------------------------------------------------
// 


butcher.itemDescriptionModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $('.product-item').on('click', '.item-info-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      showModal($(this), 'components/item-description-modal.html');
    });

  });

  function showModal(button, modalFilePath) {
    $.ajax({
      url: modalFilePath,
      success: function(html) {
        var itemModal = $(html),
            productItem = button.parents('.product-item').first();

        itemModal.find('#item-modal-title').html(getTitle(productItem));
        itemModal.find('#item-description').html(getDescription(button));
        itemModal.find('#item-modal-image').attr('src', getImageSource(productItem));

        itemModal.modal();
      }
    });
  }

  function getTitle(productItem) {
    var title = productItem.find('.deli-item-title').html();

    return title;
  }

  function getDescription(button) {
    var description = button.data('item-description');

    return description;
  }

  function getImageSource(productItem) {
    var image = productItem.find('img'),
        source = image.attr('src');

    return source;
  }

} (window.jQuery);
