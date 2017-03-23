var Backbone = require('backbone');
var ParseModel = require('../utilities/parse.js').ParseModel;
var ParseCollection = require('../utilities/parse.js').ParseCollection;

var Challenge = ParseModel.extend({
  defaults:{
    
  },
  urlRoot: 'https://brand-new-app.herokuapp.com/classes/Challenge'
});

var ChallengeCollection = ParseCollection.extend({
  model: Challenge,
  baseUrl: 'https://brand-new-app.herokuapp.com/classes/Challenge'
})

module.exports = {
  Challenge,
  ChallengeCollection
}
