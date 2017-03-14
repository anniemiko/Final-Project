var React = require('react');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var AddHabitContainer = require('./addhabit.jsx').AddHabitContainer;

class HabitContainer extends React.Component{
  constructor(props){
    super(props)
    var userId = User.current().get('objectId');
    var habitCollection = new HabitCollection;

    // habitCollection.parseWhere('owner', '_User', userId).fetch().then(()=>{this.setState({collection: habitCollection})})
    // this.state = {
    //   collection
    // }
  }
  render(){
    return (
    <div className="container">
      <div className="col-md-12">
        <div className="user-profile">
          <img src="#" alt=""/>
          <h3>{User.current().get('username')}</h3>
        </div>
        <HabitList />
      </div>
    </div>
  )
  }
}


class HabitList extends React.Component{
  constructor(props){
    super(props)
    this.showAddHabit = this.showAddHabit.bind(this);
    this.hideAddHabit = this.hideAddHabit.bind(this);
    this.state = {
      showAddHabit: false
    }
  }
  showAddHabit(){
    this.setState({showAddHabit: true});
  }
  hideAddHabit(){
    this.setState({showAddHabit: false});
  }
  render(){
    return (
    <div className="row">
      <div className="habits col-md-10 col-md-push-1">
        <div className="habit-list col-md-7">
          <h3>Habits</h3>
          <button onClick={this.showAddHabit} className="btn btn-primary">Add Habit</button>
          <ul>
            <li>habit one</li>
            <li>habit two</li>
          </ul>
        </div>
        <div className="check-done col-md-3">

        </div>
      </div>
      <AddHabitContainer show={this.state.showAddHabit} hide={this.hideAddHabit}/>
    </div>
  )
  }
}

module.exports = {
  HabitContainer
}
