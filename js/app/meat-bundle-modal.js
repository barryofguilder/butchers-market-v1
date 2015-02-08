//
// Meat Bundle Modal
// --------------------------------------------------
// 


butcher.meatBundleModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $('.meat-bundle-item').on('click', '.item-info-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      showModal($(this), 'components/meat-bundle-modal.html');
    });

  });

  function showModal(button, modalFilePath) {
    $.ajax({
      url: modalFilePath,
      success: function(html) {
        var itemModal = $(html),
            bundleItem = button.parents('.meat-bundle-item').first();

        itemModal.find('#item-modal-title').html(getTitle(bundleItem));
        itemModal.find('#meat-bundle-list').append(getList(button));
        itemModal.find('#item-modal-image').attr('src', getImageSource(bundleItem));

        itemModal.modal();
      }
    });
  }

  function getTitle(bundleItem) {
    var title = bundleItem.find('.meat-bundle-title').html() + " - " + bundleItem.find('.meat-bundle-price').html();

    return title;
  }

  function getList(button) {
    var meatItems = "", 
        itemList = button.data('item-list'),
        items = itemList ? itemList.split(';') : '';

    $.each(items, function(index, value) {
      meatItems += "<li>" + value + "</li>";
    });

    return meatItems;
  }

  function getImageSource(bundleItem) {
    var image = bundleItem.find('img'),
        source = image.attr('src');

    return source;
  }

} (window.jQuery);
