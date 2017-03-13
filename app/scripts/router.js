var var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'login': 'login',
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
