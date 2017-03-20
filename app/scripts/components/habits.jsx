var React = require('react');
var moment = require('moment');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var AddHabitContainer = require('./addhabit.jsx').AddHabitContainer;
var Star = require('../models/stars.js').Star;

class HabitContainer extends React.Component{
  constructor(props){
    super(props)
    var userId = User.current().get('objectId');
    var habitCollection = new HabitCollection;

    this.deleteHabit = this.deleteHabit.bind(this);

    habitCollection.parseWhere('owner', '_User', userId).fetch().then(()=>{this.setState({collection: habitCollection})})
    this.state = {
      collection: habitCollection,
    }
  }
  deleteHabit(habit){
    habit.destroy()
    this.setState({collection: this.state.collection});
  }
  render(){
    var profilePic = User.current().get('pic').url || 'images/avatar-cat.jpg'
    return (
    <div className="container">
      <div className="col-md-12">
        <div className="user-profile">
          <img src={profilePic} alt={User.current().get('pic').name}/>
          <h3>{User.current().get('username')}</h3>
          <h5 className="waves-effect darken-1 btn yellow right" onClick={User.logout}>Logout</h5>
        </div>
        <HabitList collection={this.state.collection} deleteHabit={this.deleteHabit} />
      </div>
    </div>
  )
  }
}

class HabitList extends React.Component{
  constructor(props){
    super(props)
    var star = new Star();

    this.showAddHabit = this.showAddHabit.bind(this);
    this.hideAddHabit = this.hideAddHabit.bind(this);
    this.checkHabit = this.checkHabit.bind(this);
    this.state = {
      showAddHabit: false,
      star: star,
    }
  }
  showAddHabit(){
    this.setState({showAddHabit: true});
  }
  hideAddHabit(){
    this.setState({showAddHabit: false});
  }
  checkHabit(habit){
    var star = this.state.star;

    star.isNew() ? star.set('timestamp', moment().format('l')): star.set('timestamp', star.get('timestamp'));

    star.setPointer('habitCheck', '_Stars', habit);

    star.save().then(()=>{
      // this.props.hide()
    });
    this.state = {
     star
    }
    console.log(star);
  }
  render(){
    var habitList = this.props.collection.map((habit)=>{
      return(
        <li key={habit.cid} className="collection-item valign">
          <form action="#">
            <input onChange={()=> this.checkHabit(habit.get('objectId'))} type="checkbox" className="filled-in" id="filled-in-box"/>
            <label htmlFor="filled-in-box" className="left-align" id="habit-text">{habit.get('description')}</label>
          </form>
          <a href={"#habitdetail/" + habit.get('objectId')} className="btn waves-effect blue ">
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
        <div className="connect">
          <h3>Connect with Friends</h3>
          <div className="row">
            <div className="col s6">
              <h5>Search for friends</h5>
            </div>
            <div className="col s6">
              <h5>Search for habits</h5>
            </div>
          </div>
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
