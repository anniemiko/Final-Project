var Backbone = require('backbone'):

var Habits = Backbone.Models.extend({
  defaults:{
    'name':
  }

});

var HabitCollection = Backbone.Collection.extend({
  model: Habits,
  url: 'http://tiny-parse-server.herokuapp.com/classes/Baty'
})
