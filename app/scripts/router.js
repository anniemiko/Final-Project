var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./utilities/parse');
var HomeContainer = require('./components/splash.jsx').HomeContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;
var User = require('./models/user').User;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'modal1': 'login',
    'habits/:id': 'habits',
    'habitdetail/:id': 'habitdetail',
    'profile/:id': 'profile'
  },
  home: function(){
    ReactDOM.render(
      React.createElement(HomeContainer),
      document.getElementById('app')
    )
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    )
  },
});

var router = new AppRouter();

module.exports = router;
