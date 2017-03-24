var React = require('react');
var moment = require('moment');
var _ = require('underscore');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var UserCollection = require('../models/user.js').UserCollection;
var parse = require('../utilities/parse').parse;

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
    var userCollection = new UserCollection();

    this.deleteHabit = this.deleteHabit.bind(this);

    userCollection.fetch().then(()=>{this.setState({userCollection: userCollection}), console.log('drinks', userCollection)});

    habitCollection.parseWhere('owner', '_User', userId).fetch().then(()=>{this.setState({collection: habitCollection})})

    this.state = {
      collection: habitCollection,
      userCollection: userCollection
    }
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
          <div className="col s12">
            <div className="row">
              <div className="col s3">
                <img src={profilePic} alt={User.current().get('pic').name} className="circle profilepic"/>
                  <span className="title username">{User.current().get('username')}</span>
                <a href="#" className="tooltipped" data-position="right" data-delay="50" data-tooltip="Edit your profile"><i className="material-icons edit">mode_edit</i></a>
              </div>
            </div>
            <HabitList collection={this.state.collection} deleteHabit={this.deleteHabit} userCollection={this.state.userCollection} />
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

    this.showAddHabit = this.showAddHabit.bind(this);
    this.hideAddHabit = this.hideAddHabit.bind(this);
    this.showCreateChallenge = this.showCreateChallenge.bind(this);
    this.hideCreateChallenge = this.hideCreateChallenge.bind(this);
    this.showJoinChallenge = this.showJoinChallenge.bind(this);
    this.hideJoinChallenge = this.hideJoinChallenge.bind(this);
    this.checkHabit = this.checkHabit.bind(this);
    this.handleFriendSearch = _.debounce(this.handleFriendSearch, 300).bind(this)

    this.state = {
      showAddHabit: false,
      showCreateChallenge: false,
      showJoinChallenge: false,
      star: star
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
    this.setState({showCreateChallenge: true, showJoinChallenge: false});
  }
  hideCreateChallenge(){
    this.setState({showCreateChallenge: false});
  }
  showJoinChallenge(){
    this.setState({showJoinChallenge: true, showCreateChallenge: false});
  }
  hideJoinChallenge(){
    this.setState({showJoinChallenge: false});
  }
  checkHabit(habit){
    var star = this.state.star;

    star.isNew() ? star.set('timestamp', moment().format('l')): star.set('timestamp', star.get('timestamp'));

    star.setPointer('habitCheck', '_Stars', habit);

    star.save().then(()=>{

    });
    this.state = {
     star
    }
  }
  handleFriendSearch(data){
    console.log('searchterm', data);

    var searchedUser = this.props.userCollection.findWhere({username:data});
    console.log('searchedUser', searchedUser);
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
            <div className="col m6 s12">
              <h4>Group challenge!</h4>
              <p>List of challenges user is participating in</p>
              <button onClick={this.showCreateChallenge} className="btn">Create a Challenge</button>

              <button onClick={this.showJoinChallenge} className="btn">Join a Challenge</button>
            </div>
            <div className="col m6 s12">
              <h4>Friends</h4>
                  <FriendForm handleFriendSearch={this.handleFriendSearch} searchedUser={this.state.searchedUser} />
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
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(e){
    this.props.handleFriendSearch(this.state.searchTerm)
    console.log('props', this.props.searchedUser);
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
