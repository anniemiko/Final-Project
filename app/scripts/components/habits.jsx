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

    this.deleteHabit = this.deleteHabit.bind(this);

    habitCollection.parseWhere('owner', '_User', userId).fetch().then(()=>{this.setState({collection: habitCollection})})
    this.state = {
      collection: habitCollection
    }
  }
  deleteHabit(habit){
    habit.destroy()
    this.setState({collection: this.state.collection});
  }
  render(){
    var profilePic = User.current().get('pic').url || 'images/luffy-tn.png'
    return (
    <div className="container">
      <div className="col-md-12">
        <div className="user-profile">
          <img src={profilePic} alt={User.current().get('pic').name}/>
          <h3>{User.current().get('username')}</h3>
          <h5 className="waves-effect darken-1 btn yellow right" onClick={User.logout}>Logout</h5>
        </div>
        <HabitList collection={this.state.collection} deleteHabit={this.deleteHabit}/>
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
    var habitList = this.props.collection.map((habit)=>{
      return(
        <li key={habit.cid} className="collection-item valign">
          <h4 className="left-align">{habit.get('description')}</h4>
          <a href={"#habitdetail/" + habit.get('objectId')} className="btn waves-effect blue right-align">
              View Habit
            </a>
            <a onClick={(e)=>{e.preventDefault(); this.props.deleteHabit(habit)}} className="btn waves-effect red secondary-content">Delete Habit</a>
        </li>
      )
    })
    return (
    <div className="row">
      <div className="habits">
        <div className="habit-list">
          <h3>Habits</h3>
          <button onClick={this.showAddHabit} className="btn">Add Habit</button>
          <ul className="collection valign">
            {habitList}
          </ul>
        </div>
        <div className="check-done">

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
