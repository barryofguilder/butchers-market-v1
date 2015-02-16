//
// Email Modal
// --------------------------------------------------
//


butcher.emailModal = function ($) {

  // Things to do once the page has loaded.
  //
  $(function() {

    $(document).on('click', '.contact-us', function (e) {
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
          checkForRequired();

          grecaptcha.render('recaptcha', {
            'sitekey' : '6LcrHAITAAAAACvTiT4qS4dvbwL7wgGRXhJtsKim'
          });
        });
      }
    });
  }

  function handleSubmit() {
    $("#email-form").submit(function(e){
      // Prevent the form from doing it's default action
      e.preventDefault();

      var form = $(this);

      $.ajax({
        type: 'POST',
        url: 'server/email.php',
        data: form.serialize(),
        success: function(response){
          var data = $.parseJSON(response);

          if (data.error) {
            showErrorMessage(true, data.message);
            handleFormErrors(form, data.fields);
          } else {
            $('#email-modal').modal('hide');
          }
        },
        error: function(){
          showErrorMessage(true, "Something went wrong trying to submit.  Please try again later.");
        }
      });
    });
  }

  function checkForRequired() {
    $('#email-form').on('blur', '.form-group.required', function() {
      var field = $(this).find('.form-control'),
          group = field.parents('.form-group');

      if (field.val() === '') {
        group.addClass('has-error');
      } else {
        group.removeClass('has-error');
      }
    });
  }

  function clearErrors(form) {
    var groups = form.find('.form-group');

    groups.each(function() {
      $(this).removeClass('has-error');
    });
  }

  function showErrorMessage(show, message) {
    if (show) {
      $('#email-errors .alert').html(message);
      $('#email-errors').removeClass('hidden');
    } else {
      $('#email-errors').addClass('hidden');
    }
  }

  function handleFormErrors(form, fields) {
    clearErrors(form);

    var fieldNames = fields.split(',');

    $.each(fieldNames, function(index, value) {
      if (value.trim() === '') {
        return;
      }

      var group = form.find('[name="' + value + '"]').parents('.form-group');
      group.addClass('has-error');
    });
  }

} (window.jQuery);
