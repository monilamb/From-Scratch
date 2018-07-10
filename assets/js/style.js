$(function() {
    $('.card-body').hover(function() {
      $('.blur-background').css('filter', 'blur(10px)');
    }, function() {
      // on mouseout, reset the background colour
      $('.card-body').css('filter', 'blur(0)');
    });
  });