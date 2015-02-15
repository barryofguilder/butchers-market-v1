//
// BBQ Feast Modal
// --------------------------------------------------
//


butcher.bbqFeastModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $('.bbq-feast-item').on('click', '.item-info-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      showModal($(this), 'components/bbq-feast-modal.html');
    });

  });

  function showModal(button, modalFilePath) {
    $.ajax({
      url: modalFilePath,
      success: function(html) {
        var itemModal = $(html),
            feastItem = button.parents('.bbq-feast-item').first();

        itemModal.find('#item-modal-title').html(getTitle(feastItem));
        itemModal.find('#item-modal-image').attr('src', getImageSource(feastItem));
        populatePrices(itemModal, button);


        itemModal.modal();
      }
    });
  }

  function getTitle(feastItem) {
    var title = feastItem.find('.deli-item-title').html();

    return title;
  }

  function populatePrices(itemModal, button) {
    var priceItems = itemModal.find('#price-list .quantity-price'),
        itemList = button.data('item-list'),
        prices = itemList ? itemList.split(';') : '';

    priceItems.each(function(index) {
      if (prices.length >= (index+1)) {
        $(this).text(prices[index]);
      }
    });
  }

  function getImageSource(feastItem) {
    var image = feastItem.find('img'),
        source = image.attr('src');

    return source;
  }

} (window.jQuery);
