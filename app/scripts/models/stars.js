var Backbone = require('backbone');
var ParseModel = require('../utilities/parse.js').ParseModel;
var ParseCollection = require('../utilities/parse.js').ParseCollection;
// var habitId = require('../components/habitDetail.jsx').habitId;

var Star = ParseModel.extend({
  defaults:{
    timestamp: ''
  },
  urlRoot: 'https://brand-new-app.herokuapp.com/classes/Stars'
});

var StarCollection = ParseCollection.extend({
  model: Star,
  baseUrl: 'https://brand-new-app.herokuapp.com/classes/Stars'
  })

module.exports = {
  Star,
  StarCollection
}
