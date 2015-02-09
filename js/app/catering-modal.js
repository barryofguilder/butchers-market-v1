//
// Catering Modal
// --------------------------------------------------
//


butcher.cateringModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $('.catering-item').on('click', '.item-info-btn', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      showModal($(this), 'components/catering-modal.html');
    });

  });

  function showModal(button, modalFilePath) {
    $.ajax({
      url: modalFilePath,
      success: function(html) {
        var itemModal = $(html),
            cateringItem = button.parents('.catering-item').first();

        itemModal.find('#item-modal-title').html(getTitle(cateringItem));
        itemModal.find('#catering-list').append(getList(button));
        itemModal.find('#item-modal-image').attr('src', getImageSource(cateringItem));

        itemModal.modal();
      }
    });
  }

  function getTitle(cateringItem) {
    var title = cateringItem.find('.deli-item-title').html();

    return title;
  }

  function getList(button) {
    var cateringItems = "",
        itemList = button.data('item-list'),
        items = itemList ? itemList.split(';') : '';

    $.each(items, function(index, value) {
      cateringItems += "<li>" + value + "</li>";
    });

    return cateringItems;
  }

  function getImageSource(cateringItem) {
    var image = cateringItem.find('img'),
        source = image.attr('src');

    return source;
  }

} (window.jQuery);
