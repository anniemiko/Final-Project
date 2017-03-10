var $ = require('jquery');
var Backbone = require('backbone');

require('./router');

// wait for DOM ready
$(function(){
  Backbone.history.start();
});
