var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./utilities/parse');
var HomeContainer = require('./components/splash.jsx').HomeContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;
var User = require('./models/user').User;
var HabitContainer = require('./components/habits.jsx').HabitContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home': 'index',
    'modal1': 'login',
    'habits': 'habits',
    'habitdetail/:id': 'habitdetail',
    'profile/:id': 'profile'
  },
  index: function(){
    // console.log('testing');
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
  habits: function(id){
    ReactDOM.render(
      React.createElement(HabitContainer, {id: id}),
      document.getElementById('app')
    )
  },
});

var router = new AppRouter();

module.exports = router;
