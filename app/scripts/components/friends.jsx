var React = require('react');
var Backbone = require('backbone');
var Materialize = require('materialize-css');

var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;
var User = require('../models/user.js').User;
var UserCollection = require('../models/user.js').UserCollection;

class FriendsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  componentWillMount(){
    var user = User.current();
    var userId = user.get('objectId')
    var userCollection = new UserCollection();
    userCollection.whereClause = {};
    userCollection.fetch().then( () => {
      var userModel = userCollection.get(userId);
      var userFriends = userModel.get('friends');
      this.setState({userFriends: userFriends})
    });

  }
render(){
  var profilePic = User.current().get('pic').url || 'images/avatar-cat.jpg';
  var friendList = this.state.userFriends ? this.state.userFriends.map((friend, index)=>{
    console.log('friend', friend);
    return(
      <li key={index} className="collection-item col s3 center">
        <img src={friend.pic.url || 'images/avatar-cat.jpg'} className="circle profilepic"/>
        <h5 className="friend-username">{friend.username}</h5>
      </li>
    )
  }) : <div>you have no friends</div>
  return (
      <BaseLayout>
          <div className="col s12">
            <div className="row">
              <div className="col s3">
                <img src={profilePic} alt={User.current().get('pic').name} className="circle profilepic"/>
                  <span className="title username">{User.current().get('username')}</span>
              </div>
              <div className="col s9 center">
                <h3>Your Friends</h3>
              </div>
            </div>
            <div className="row">
              <ul>
                {friendList}
              </ul>
            </div>
          </div>
      </BaseLayout>
    )
  }
}

module.exports = {
  FriendsContainer
}
