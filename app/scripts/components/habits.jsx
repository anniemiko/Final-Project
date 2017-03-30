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


    userCollection.fetch().then(()=>{this.setState({userCollection: userCollection}), console.log('all users', userCollection)});

    habitCollection.parseWhere('owner', '_User', userId).fetch().then(()=>{this.setState({collection: habitCollection})}).done(habitCollection.urlSetter())

    this.state = {
      collection: habitCollection,
      userCollection: userCollection
    }
  }
  deleteHabit(habit){
    habit.destroy()
    this.setState({collection: this.state.collection});
  }
  handleFriendSearch(data){
    console.log('searchterm', data);

    var friend = this.state.userCollection.findWhere({username:data});

    // var friends = this.state.friends;
    // friends.push(friend);
    this.setState({friend})
    //
    // console.log('searchedUser', friend);
    console.log('find friend', friend);
  }
  render(){
    var profilePic = User.current().get('pic').url || 'images/avatar-cat.jpg'
    return (
      <BaseLayout>
          <div className="col s12">
            <div className="row">
              <div className="col s3">
                <img src={profilePic} alt={User.current().get('pic').name} className="circle profilepic"/>
                  <span className="title username">{User.current().get('username')}</span>
                <a href="#!" className="tooltipped" data-position="right" data-delay="50" data-tooltip="Edit your profile"><i className="material-icons edit">mode_edit</i></a>
              </div>
            </div>
            <HabitList collection={this.state.collection} deleteHabit={this.deleteHabit} userCollection={this.state.userCollection} handleFriendSearch={this.handleFriendSearch} friend={this.state.friend} challengeCollection={this.state.challengeCollection}/>
          </div>
      </BaseLayout>
  )
  }
}

class HabitList extends React.Component{
  constructor(props){
    super(props)
    console.log('props', this.props.friend);
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
  }
  handleSearch(e){
    this.setState({showCreateChallenge: false});
    this.setState({showJoinChallenge: false});
    this.setState({searchTerm: e.target.value});
  }
  addFriend(friend){
    var user = User.current();
    var userId = user.get('objectId')
    console.log('user id', userId);
    var userCollection = new UserCollection();
    userCollection.whereClause = {};
    userCollection.fetch().then( () => {
      var userModel = userCollection.get(userId);
      var userFriends = userModel.get('friends');

      userFriends.push(friend);

      userModel.set({
        'friends': userFriends
      });

      console.log('user', userModel);

      userModel.save().then( (data) => {
        console.log('returned friend data', data);
      });
    })
    // console.log('userFriends', userFriends);
  }
  render(){
    var habitList = this.props.collection.map((habit)=>{
      return(
        <li key={habit.cid} className="collection-item valign" id="habit-list">
          <form action="#">
            <input onChange={()=> this.checkHabit(habit.get('objectId'))} type="checkbox" className="filled-in col s1" id={habit.get('objectId')}/>
            <label htmlFor={habit.get('objectId')} className="left-align col s6" id="habit-text">{habit.get('description')}</label>
          </form>
          <a href={"#habitdetail/" + habit.get('objectId')} className="btn waves-effect">
              View Habit
            </a>
            <a onClick={(e)=>{e.preventDefault(); this.props.deleteHabit(habit)}} className="btn waves-effect orange darken-4 secondary-content">Delete Habit</a>
        </li>
      )
    })
    var friendSearch = !this.props.friend ?
      <div></div> : <div className="searched-friend"><div className="col s9">
        <img src={this.props.friend.get('pic').url || 'images/avatar-cat.jpg'} className="circle profilepic"/>
        <h6 className="friend-name">{this.props.friend.username}</h6>
      </div>
      <div className="col s3">
        <a href="#friends"><button onClick={()=>this.addFriend(this.props.friend)} className="btn waves-effect orange right add-friend">Add friend</button></a>
      </div>
      </div>


    return (
    <div className="row">
      <div className="habits">
        <div className="habit-list">
          <h3 className="light-green center">Habits</h3>
          <i className="material-icons check">offline_pin</i><span className="check-off">Check off your habit every day you complete it!</span>
          <ul className="collection valign habit-list">
            {habitList}
          </ul>
          <button onClick={this.showAddHabit} className="btn light-green center">Add a new Habit</button>
        </div>
        <div className="connect">
          <h4 className="center others">Connect with Others</h4>
          <div className="row">
            <div className="col m6 s12">
              <h4>Group challenge!</h4>
              <button onClick={this.showCreateChallenge} className="btn light-blue accent-4">Create a Challenge</button>

              <button onClick={this.showJoinChallenge} className="btn light-blue accent-4">Join a Challenge</button>
            </div>
            <div className="col m6 s12">
              <h4><i className="material-icons search">search</i>Search for Friends</h4>
                    <div className="friends">
                      <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                          <input onChange={this.handleSearch} id="searchTerm" type="search" placeholder="search by username"/>

                            <button className="btn waves-effect waves-light light-blue accent-4" type="submit" name="action">Submit
                              <i className="material-icons right">search</i>
                            </button>
                        </div>
                      </form>
                      {friendSearch}
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
