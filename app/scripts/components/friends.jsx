var React = require('react');
var Backbone = require('backbone');

var BaseLayout = require('../layouts/base-layout.jsx').BaseLayout;
var User = require('../models/user.js').User;

class FriendsContainer extends React.Component{
  constructor(props){
    super(props)
    var friends = User.current().get('friends');
    this.state = {
      friends
    }
}
render(){
  var profilePic = User.current().get('pic').url || 'images/avatar-cat.jpg';
  var friendList = this.state.friends.map((friend, index)=>{
    return(
      <li key={index} className="collection-item">
        <img src={friend.get('pic').url} className="circle profilepic"/>
        <h4>{friend.get('username')}</h4>
      </li>
    )
  })
  return (
      <BaseLayout>
        <div className="container">
          <div className="col s12">
            <div className="row">
              <div className="col s3">
                <img src={profilePic} alt={User.current().get('pic').name} className="circle profilepic"/>
                  <span className="title username">{User.current().get('username')}</span>
              </div>
            </div>
            <div className="row">
              <ul>
                {friendList}
              </ul>
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

module.exports = {
  FriendsContainer
}
