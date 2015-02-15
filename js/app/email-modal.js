//
// Email Modal
// --------------------------------------------------
//


butcher.emailModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $(document).on('click', '.email-us', function (e) {
      // Prevent the anchor tag from doing it's default action
      e.preventDefault();

      showModal($(this), 'components/email-modal.html');
    });

  });

  function showModal(button, modalFilePath) {
    $.ajax({
      url: modalFilePath,
      success: function(html) {
        var emailModal = $(html);

        emailModal.modal({
          backdrop: 'static'
        });

        emailModal.on('shown.bs.modal', function () {
          handleSubmit();
        });
      }
    });
  }

  function handleSubmit() {
    $("#email-form").submit(function(e){
      // Prevent the form from doing it's default action
      e.preventDefault();

      $.ajax({
        type: 'POST',
        url: 'email.php',
        data: $(this).serialize(),
        success: function(response){
          var data = $.parseJSON(response);
          console.log(data);

          if (data.error) {
            $('#email-log').html(data.message);
          }

          //$('#email-log').html(msg);
          //$('#email-modal').modal('hide');
        },
        error: function(){
          alert("failure");
        }
      });
    });
  }

} (window.jQuery);
