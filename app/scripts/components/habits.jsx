var React = require('react');
var moment = require('moment');
var _ = require('underscore');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var UserCollection = require('../models/user.js').UserCollection;
var parse = require('../utilities/parse').parse;
var ParseCollection = require('../utilities/parse').ParseCollection;
var AddHabitContainer = require('./addhabit.jsx').AddHabitContainer;
var CreateChallengeContainer = require('./createchallenge.jsx').CreateChallengeContainer;
var JoinChallengeContainer = require('./joinchallenge.jsx').JoinChallengeContainer;
var Star = require('../models/stars.js').Star;
var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;

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
    // console.log(userCollection);
  }
  deleteHabit(habit){
    habit.destroy()
    this.setState({collection: this.state.collection});
  }
  render(){
    var profilePic = User.current().get('pic').url || 'images/avatar-cat.jpg'
    return (
      <BaseLayout>
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <div className="user-profile col s10">
                <img src={profilePic} alt={User.current().get('pic').name}/>
                <h3>{User.current().get('username')}</h3>
              </div>
              <div className="col s2">
                <h5 className="waves-effect darken-1 btn yellow right" onClick={User.logout}>Logout</h5>
              </div>
            </div>
            <HabitList collection={this.state.collection} deleteHabit={this.deleteHabit} />
          </div>
        </div>
      </BaseLayout>
  )
  }
}

class HabitList extends React.Component{
  constructor(props){
    super(props)
    var star = new Star();
    var userCollection = new UserCollection();

    userCollection.fetch().then(()=>{this.setState({userCollection: userCollection})});
    console.log(userCollection);

    this.showAddHabit = this.showAddHabit.bind(this);
    this.hideAddHabit = this.hideAddHabit.bind(this);
    this.showCreateChallenge = this.showCreateChallenge.bind(this);
    this.hideCreateChallenge = this.hideCreateChallenge.bind(this);
    this.showJoinChallenge = this.showJoinChallenge.bind(this);
    this.hideJoinChallenge = this.hideJoinChallenge.bind(this);
    this.checkHabit = this.checkHabit.bind(this);
    this.handleSearch = _.debounce(this.handleSearch, 300).bind(this)

    this.state = {
      showAddHabit: false,
      showCreateChallenge: false,
      showJoinChallenge: false,
      star: star,
      userCollection: userCollection
    }
  }
  showAddHabit(){
    this.setState({showAddHabit: true});
  }
  hideAddHabit(){
    this.setState({showAddHabit: false});
    this.props.collection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(()=>{this.setState({collection: this.props.collection})})
  }
  showCreateChallenge(){
    this.setState({showCreateChallenge: true});
  }
  hideCreateChallenge(){
    this.setState({showCreateChallenge: false});
  }
  showJoinChallenge(){
    this.setState({showJoinChallenge: true});
  }
  hideJoinChallenge(){
    this.setState({showJoinChallenge: false});
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
  }
  handleSearch(data){
    console.log(data);
    var userCollection = this.state.userCollection
    var searchedUser = userCollection.findWhere({username: data});
    console.log(searchedUser);
    this.setState({searchedUser: searchedUser});
  }
  render(){
    var habitList = this.props.collection.map((habit)=>{
      return(
        <li key={habit.cid} className="collection-item valign">
          <form action="#">
            <input onChange={()=> this.checkHabit(habit.get('objectId'))} type="checkbox" className="filled-in" id={habit.get('objectId')}/>
            <label htmlFor={habit.get('objectId')} className="left-align" id="habit-text">{habit.get('description')}</label>
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
          <h3 className="center">Connect with Others</h3>
          <div className="row">
            <div className="col s6">
              <h4>Group challenge!</h4>
              <p>List of challenges user is participating in</p>
              <button onClick={this.showCreateChallenge} className="btn">Create a Challenge</button>
              
              <button onClick={this.showJoinChallenge} className="btn">Join a Challenge</button>
            </div>
            <div className="col s6">
              <h4>Friends</h4>
                  <FriendForm handleSearch={this.handleSearch} searchedUser={this.state.searchedUser} />
            </div>
          </div>
        </div>
      </div>
      <AddHabitContainer show={this.state.showAddHabit} hide={this.hideAddHabit}/>
      <CreateChallengeContainer show={this.state.showCreateChallenge} hide={this.hideCreateChallenge}/>
      <JoinChallengeContainer show={this.state.showJoinChallenge} hide={this.hideJoinChallenge}/>
    </div>
  )
  }
}

class FriendForm extends React.Component{
  constructor(props){
    super(props)
    console.log('props', this.props.searchedUser);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(e){
    this.props.handleSearch(this.state.searchTerm)
  }
  handleSearch(e){
    this.setState({searchTerm: e.target.value});
  }
  render(){
    return(
      <div className="friends">
        <p>List of friends goes here</p>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <i className="material-icons">search</i>
            <input onChange={this.handleSearch} id="searchTerm" type="search" placeholder="search for friends"/>

              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">search</i>
              </button>
          </div>
        </form>
        <ul>
          <li></li>
          </ul>
      </div>

    )
  }
}

module.exports = {
  HabitContainer
}
