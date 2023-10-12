$(document).ready(function() {
  // --- our code goes here ---
  $('.tweet-input').on('input', function() {
    const counter = $(this).closest('.new-tweet').find('.counter-val');
    const value = 140 - (this.value.length);
    counter.text(value)
    if (value<0){

      counter.css('color', '#e20505') 
    }
    else {
      counter.css('color', 'black') 

    }
  });
});