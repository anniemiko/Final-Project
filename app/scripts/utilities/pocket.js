var $ = require('jquery');

var ajaxSetUp = function setupAjax(){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader('X-Accept', 'application/x-www-form-urlencoded');

    }
  });
}

module.exports = ajaxSetUp;
