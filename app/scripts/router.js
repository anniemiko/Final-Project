var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./utilities/parse');
var HomeContainer = require('./components/splash.jsx').HomeContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;
var User = require('./models/user').User;
var HabitContainer = require('./components/habits.jsx').HabitContainer;
var HabitDetailContainer = require('./components/habitDetail.jsx').HabitDetailContainer;
var AboutContainer = require('./components/about.jsx').AboutContainer;
var FriendsContainer = require('./components/friends.jsx').FriendsContainer;
var ChallengesContainer = require('./components/challenges.jsx').ChallengesContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home': 'index',
    'about': 'about',
    'habits': 'habits',
    'friends': 'friends',
    'challenges': 'challenges',
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
  about: function(){
    ReactDOM.render(
      React.createElement(AboutContainer),
      document.getElementById('app')
    )
  },
  habits: function(id){
    ReactDOM.render(
      React.createElement(HabitContainer, {id: id}),
      document.getElementById('app')
    )
  },
  friends: function(id){
    ReactDOM.render(
      React.createElement(FriendsContainer, {id: id}),
      document.getElementById('app')
    )
  },
  challenges: function(id){
    ReactDOM.render(
      React.createElement(ChallengesContainer, {id: id}),
      document.getElementById('app')
    )
  },
  habitdetail: function(id){
    ReactDOM.render(
      React.createElement(HabitDetailContainer, {id: id}),
      document.getElementById('app')
    )
  },
});

var router = new AppRouter();

module.exports = router;
