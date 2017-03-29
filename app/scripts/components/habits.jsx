var React = require('react');
var moment = require('moment');
var _ = require('underscore');
var Materialize = require('materialize-css');
require('../../../node_modules/materialize-css/js/tooltip.js');

var Habit = require('../models/habits.js').Habit;
var HabitCollection = require('../models/habits.js').HabitCollection;
var User = require('../models/user.js').User;
var UserCollection = require('../models/user.js').UserCollection;
var parse = require('../utilities/parse').parse;

var AddHabitContainer = require('./addhabit.jsx').AddHabitContainer;
var ChallengeCollection = require('../models/challenge.js').ChallengeCollection;
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
    var challengeCollection = new ChallengeCollection();

    this.deleteHabit = this.deleteHabit.bind(this);
    this.handleFriendSearch = _.debounce(this.handleFriendSearch, 300).bind(this)


    userCollection.fetch().then(()=>{this.setState({userCollection: userCollection}), console.log('drinks', userCollection)});

    habitCollection.parseWhere('owner', '_User', userId).fetch().then(()=>{this.setState({collection: habitCollection})}).done(habitCollection.urlSetter())

    this.state = {
      collection: habitCollection,
      userCollection: userCollection,
      friends: []
    }
  }
  deleteHabit(habit){
    habit.destroy()
    this.setState({collection: this.state.collection});
  }
  handleFriendSearch(data){
    console.log('searchterm', data);

    var friend = this.state.userCollection.findWhere({username:data});

    var friends = this.state.friends;
    friends.push(friend);
    this.setState({friends})

    console.log('searchedUser', friend);
    console.log('friends', friends);
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
                <a href="#!" className="tooltipped" data-position="right" data-delay="50" data-tooltip="Edit your profile"><i className="material-icons edit">mode_edit</i></a>
              </div>
            </div>
            <HabitList collection={this.state.collection} deleteHabit={this.deleteHabit} userCollection={this.state.userCollection} handleFriendSearch={this.handleFriendSearch} friends={this.state.friends} challengeCollection={this.state.challengeCollection}/>
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

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
  handleSubmit(e){
    this.props.handleFriendSearch(this.state.searchTerm)
    console.log('props', this.props.friends);
  }
  handleSearch(e){
    this.setState({showCreateChallenge: false});
    this.setState({showJoinChallenge: false});
    this.setState({searchTerm: e.target.value});
  }
  addFriend(friend){
    var user = User.current();
    var userFriends = User.current().get('friends');

    userFriends.push(friend);

    user.set({
      'friends': userFriends
    });

    console.log('user', user);

    user.save();
    // console.log('userFriends', userFriends);
  }
  render(){
    var habitList = this.props.collection.map((habit)=>{
      return(
        <li key={habit.cid} className="collection-item valign">
          <form action="#">
            <input onChange={()=> this.checkHabit(habit.get('objectId'))} type="checkbox" className="filled-in col s1" id={habit.get('objectId')}/>
            <label htmlFor={habit.get('objectId')} className="left-align col s6" id="habit-text">{habit.get('description')}</label>
          </form>
          <a href={"#habitdetail/" + habit.get('objectId')} className="btn waves-effect blue ">
              View Habit
            </a>
            <a onClick={(e)=>{e.preventDefault(); this.props.deleteHabit(habit)}} className="btn waves-effect red secondary-content">Delete Habit</a>
        </li>
      )
    })
    var friendList = this.props.friends.map((friend, index)=>{
      console.log(friend);
      return(
        <li key={index} className="collection-item">
          <img src={friend.get('pic').url || 'images/avatar-cat.jpg'} className="circle profilepic"/>
          <h6>{friend.get('username')}</h6>
          <button onClick={()=>this.addFriend(friend)} className="btn waves-effect orange secondary-content top">Add friend</button>
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
              <h4>Search for Friends</h4>
                    <div className="friends">
                      <p>List of friends goes here</p>
                      <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                          <i className="material-icons">search</i>
                          <input onChange={this.handleSearch} id="searchTerm" type="search" placeholder="search by username"/>

                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                              <i className="material-icons right">search</i>
                            </button>
                        </div>
                      </form>
                      <ul>
                        {friendList}
                      </ul>
                    </div>
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

module.exports = {
  HabitContainer
}
