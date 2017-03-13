var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../utilities/parse');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://brand-new-app.herokuapp.com/users'
  }, {
    login: function(creds, callback){
      var url = 'https://brand-new-app.herokuapp.com//login?' + $.param(creds);
      parse.parse.initialize();

      $.get(url).then(data => {
        var newUser = new User(data);
        User.store(newUser);
        callback(newUser);
      });

        parse.parse.deinitialize();
    },
    signup: function(creds, callback){
      var newUser = new User(creds);
      newUser.save().then(() => {
        User.store(newUser);
        callback(newUser);
      });
    },
    store: function(user){
      localStorage.setItem('user', JSON.stringify(user));
    },
    current: function(){
      var user = localStorage.getItem('user');

      // if no user in local storage, bail-out
      if(!user){
        return false;
      }

      var currentUser = new User(JSON.parse(user));

      if (!currentUser.get('sessionToken')){
        return false;
      }

      return currentUser
    }
});

module.exports = {
  User
}
