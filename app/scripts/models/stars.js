var Backbone = require('backbone');
var ParseModel = require('../utilities/parse.js').ParseModel;
var ParseCollection = require('../utilities/parse.js').ParseCollection;

var Star = ParseModel.extend({
  defaults:{
    timestamp: ''
  },
  urlRoot: 'https://brand-new-app.herokuapp.com/classes/Stars'
});

var StarCollection = ParseCollection.extend({
  model: Star,
  baseUrl: 'https://brand-new-app.herokuapp.com/classes/Stars',
  urlSetter: function(field) {
    //allows for dynamic search of pointer fields
    //field gets passed in on Component
    this.baseUrl = 'https://brand-new-app.herokuapp.com/classes/Stars/?include=' + field;
  }
})

module.exports = {
  Star,
  StarCollection
}
