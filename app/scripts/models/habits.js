var Backbone = require('backbone');
var ParseModel = require('../utilities/parse.js').ParseModel;
var ParseCollection = require('../utilities/parse.js').ParseCollection;

var Habit = ParseModel.extend({
  defaults:{
    'habit': 'habit'
  },
  urlRoot: 'https://brand-new-app.herokuapp.com/classes/Habits'
});

var HabitCollection = ParseCollection.extend({
  model: Habit,
  baseUrl: 'https://brand-new-app.herokuapp.com/classes/Habits'
})

module.exports = {
  Habit,
  HabitCollection
}
