$( document ).ready(function() {

    $('.nav-tabs li').click(function (e) {
      $(this).parent().find('li').removeClass('active')
      $(this).addClass('active');
    });

});