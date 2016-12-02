// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
})();

$('#searchBox').keyup(function() {
  $('#results').empty();

  var query = $('#searchBox').val();

  if(query.length == 0) {
    $('#results').removeClass('notEmpty');
    return;
  }

  var mattAPI  = 'http://www.mattbowytz.com/simple_api.json?data=all';
  var mattAPI2 =  'http://www.mattbowytz.com/simple_api.json?data=comics';

  var listOut = '';

  $.ajax({
    dataType: 'json',
    url: mattAPI,
    success: function(data) {
      $.each(data.data, function(index, column) {
        $.each(column, function(index2, value) {
          if(value.substring(0, query.length).toLowerCase() == query.toLowerCase()) {
            listOut += value
          }
        });
      });

      $.ajax({
        dataType: 'json',
        url: mattAPI2,
        success: function(data) {
          $.each(data.data, function(index3, value2) {
            if(value2.substring(0, query.length).toLowerCase() == query.toLowerCase()) {
              listOut += value2;
            }
          });

          $('#results').html(listOut);

          if($('#results').children().length < 1) {
            $('#results').removeClass('notEmpty');
          } else {
            $('#results').addClass('notEmpty');
          }
        }
      });
    }
  });

});
