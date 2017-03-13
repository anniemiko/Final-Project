var React = require('react');

var Habit = require('../models/habits.js');

class HabitContainer extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return
    <div class="container">
      <div class="col-md-12">
        <UserProfile />
        <HabitList />
      </div>
    </div>
  }
}

class UserProfile extends React.Component{
  render(){
    return
    <div class="row">
      <div class="user-profile">
        <img src="#" alt="">
        <h3>UserName</h3>
      </div>
      <div class="progress">
        <img src="#" alt="">
        <h4>Habit progress</h4>
      </div>
    </div>
  }
}

class HabitList extends React.Component{
  render(){
    return
    <div class="row">
      <div class="habits col-md-10 col-md-push-1">
        <div class="habit-list col-md-7">
          <ul>
            <li></li>
          </ul>
        </div>
        <div class="check-done col-md-3">

        </div>
      </div>
    </div>
  }
}
