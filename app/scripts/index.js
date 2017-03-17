var $ = require('jquery');
var Backbone = require('backbone');
// require('./utilities/pocket.js');

require('./router');

// wait for DOM ready
$(function(){
  Backbone.history.start();
});
