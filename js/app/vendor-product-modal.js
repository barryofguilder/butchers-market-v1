//
// Vendor Product Modal
// --------------------------------------------------
//


butcher.vendorProductModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $('.vendor-item').on('click', '.item-info-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      showModal($(this), 'components/vendor-product-modal.html');
    });

  });

  function showModal(button, modalFilePath) {
    $.ajax({
      url: modalFilePath,
      success: function(html) {
        var itemModal = $(html),
            productItem = button.parents('.vendor-item').first();

        itemModal.find('#item-modal-title').html(getTitle(productItem));
        itemModal.find('#item-description').html(getDescription(button));
        itemModal.find('#item-modal-image').attr('src', getImageSource(productItem));
        populateItemLink(itemModal, button);

        itemModal.modal();
      }
    });
  }

  function getTitle(productItem) {
    var title = productItem.find('.item-title').html();

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

  function populateItemLink(itemModal, button) {
    var itemLink = itemModal.find('#item-link'),
        link = button.data('item-link');

    // Hide the link if url wasn't given
    if (!link) {
      itemLink.hide();
      return;
    }

    itemLink.attr('href', link);
  }

} (window.jQuery);
